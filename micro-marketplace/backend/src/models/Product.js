const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  { 
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    image: {
      type: String,
      required: [true, 'Image URL is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Beauty', 'Toys', 'Food', 'Other'],
      default: 'Other'
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 10,
      min: 0
    }
  },
  { timestamps: true }
);

// Text index for search
productSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
