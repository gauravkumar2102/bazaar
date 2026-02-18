const express = require('express');
const router = express.Router();
const { body, validationResult, query } = require('express-validator');
const Product = require('../models/Product');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET /products – list with search + pagination
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be 1-100'),
    query('q').optional().trim(),
    query('category').optional().trim(),
    query('minPrice').optional().isFloat({ min: 0 }),
    query('maxPrice').optional().isFloat({ min: 0 }),
    query('sort').optional().isIn(['price_asc', 'price_desc', 'newest', 'rating'])
  ],
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const filter = {};

      // Text search
      if (req.query.q) {
        filter.$or = [
          { title: { $regex: req.query.q, $options: 'i' } },
          { description: { $regex: req.query.q, $options: 'i' } },
          { category: { $regex: req.query.q, $options: 'i' } }
        ];
      }

      // Category filter
      if (req.query.category) {
        filter.category = req.query.category;
      }

      // Price range
      if (req.query.minPrice || req.query.maxPrice) {
        filter.price = {};
        if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
        if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
      }

      // Sorting
      let sort = { createdAt: -1 };
      if (req.query.sort === 'price_asc') sort = { price: 1 };
      else if (req.query.sort === 'price_desc') sort = { price: -1 };
      else if (req.query.sort === 'newest') sort = { createdAt: -1 };
      else if (req.query.sort === 'rating') sort = { rating: -1 };

      const [products, total] = await Promise.all([
        Product.find(filter).populate('seller', 'name email').sort(sort).skip(skip).limit(limit),
        Product.countDocuments(filter)
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: {
          products,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          }
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  }
);

// GET /products/:id – single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name email');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: { product } });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /products – create (auth required)
router.post(
  '/',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 2, max: 100 }),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
    body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 1000 }),
    body('image').trim().notEmpty().withMessage('Image URL is required').isURL().withMessage('Image must be a valid URL'),
    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isIn(['Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Beauty', 'Toys', 'Food', 'Other'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    try {
      const { title, price, description, image, category, stock } = req.body;
      const product = await Product.create({
        title, price, description, image, category, stock,
        seller: req.user._id
      });

      await product.populate('seller', 'name email');
      res.status(201).json({ success: true, message: 'Product created', data: { product } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  }
);

// PUT /products/:id – update (auth + owner only)
router.put(
  '/:id',
  protect,
  [
    body('title').optional().trim().isLength({ min: 2, max: 100 }),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
    body('description').optional().trim().isLength({ max: 1000 }),
    body('image').optional().trim().isURL().withMessage('Image must be a valid URL'),
    body('category').optional().isIn(['Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Beauty', 'Toys', 'Food', 'Other'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      if (product.seller.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
      }

      const allowedFields = ['title', 'price', 'description', 'image', 'category', 'stock'];
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) product[field] = req.body[field];
      });

      await product.save();
      await product.populate('seller', 'name email');

      res.json({ success: true, message: 'Product updated', data: { product } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  }
);

// DELETE /products/:id – delete (auth + owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this product' });
    }

    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// POST /products/:id/favorite – add/remove favorite
router.post('/:id/favorite', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);
    const isFavorited = user.favorites.includes(req.params.id);

    if (isFavorited) {
      user.favorites = user.favorites.filter(id => id.toString() !== req.params.id);
      await user.save();
      res.json({ success: true, message: 'Removed from favorites', data: { favorited: false } });
    } else {
      user.favorites.push(req.params.id);
      await user.save();
      res.json({ success: true, message: 'Added to favorites', data: { favorited: true } });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET /products/favorites/me – get my favorites
router.get('/favorites/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'favorites',
      populate: { path: 'seller', select: 'name email' }
    });
    res.json({ success: true, data: { favorites: user.favorites } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
