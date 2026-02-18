require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Product = require('./src/models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/micro-marketplace';

const users = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123'
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'password123'
  }
];

const getProducts = (sellerIds) => [
  {
    title: 'Sony WH-1000XM5 Headphones',
    price: 349.99,
    description:
      'Industry-leading noise canceling with Auto NC Optimizer. Up to 30 hours battery life. Crystal clear hands-free calling. Multipoint connection to two devices simultaneously.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    category: 'Electronics',
    seller: sellerIds[0],
    rating: 4.8,
    reviews: 2341,
    stock: 50
  },
  {
    title: 'Classic Leather Jacket',
    price: 189.99,
    description:
      'Premium genuine leather jacket with quilted lining. Timeless biker style with asymmetric zipper, snap collar, and multiple pockets. Available in sizes XS–3XL.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    category: 'Clothing',
    seller: sellerIds[0],
    rating: 4.6,
    reviews: 876,
    stock: 30
  },
  {
    title: 'Minimalist Desk Lamp',
    price: 59.99,
    description:
      'Sleek LED desk lamp with touch-sensitive controls and 5 brightness levels. USB-C charging port built-in. Perfect for home offices and study spaces.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600',
    category: 'Home',
    seller: sellerIds[1],
    rating: 4.5,
    reviews: 543,
    stock: 100
  },
  {
    title: 'The Pragmatic Programmer',
    price: 39.99,
    description:
      '20th Anniversary Edition. The classic guide to software craftsmanship. Covers modern programming techniques, agile methodologies, and career advice for developers.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
    category: 'Books',
    seller: sellerIds[1],
    rating: 4.9,
    reviews: 5203,
    stock: 200
  },
  {
    title: 'Yoga Mat Pro – Non-Slip',
    price: 44.99,
    description:
      'Extra-thick 6mm eco-friendly TPE yoga mat. Non-slip texture on both sides, carrying strap included. 183cm × 61cm, suitable for all yoga styles and pilates.',
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600',
    category: 'Sports',
    seller: sellerIds[0],
    rating: 4.7,
    reviews: 1120,
    stock: 75
  },
  {
    title: 'Vitamin C Glow Serum',
    price: 28.00,
    description:
      '15% Vitamin C + hyaluronic acid brightening serum. Fades dark spots, evens skin tone, and boosts collagen. Suitable for all skin types. 30ml dropper bottle.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
    category: 'Beauty',
    seller: sellerIds[1],
    rating: 4.4,
    reviews: 892,
    stock: 150
  },
  {
    title: 'LEGO Architecture Skyline',
    price: 74.99,
    description:
      'Build an iconic city skyline! 598 pieces including famous landmarks. Suitable for ages 12+. Perfect display model and creative building experience.',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600',
    category: 'Toys',
    seller: sellerIds[0],
    rating: 4.8,
    reviews: 673,
    stock: 40
  },
  {
    title: 'Organic Cold Brew Coffee',
    price: 18.99,
    description:
      'Smooth, bold organic cold brew coffee concentrate. 32oz bottle, makes 64oz of coffee. Fair-trade certified, low acidity, single origin Ethiopian beans.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600',
    category: 'Food',
    seller: sellerIds[1],
    rating: 4.6,
    reviews: 2189,
    stock: 300
  },
  {
    title: 'Mechanical Keyboard TKL',
    price: 129.99,
    description:
      'Tenkeyless mechanical keyboard with Cherry MX Blue switches. Per-key RGB backlighting, N-key rollover, aluminum frame. Compatible with Windows and macOS.',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600',
    category: 'Electronics',
    seller: sellerIds[0],
    rating: 4.7,
    reviews: 1456,
    stock: 60
  },
  {
    title: 'Scented Soy Candle Set',
    price: 32.00,
    description:
      'Set of 3 hand-poured soy wax candles in glass jars. Scents: Lavender & Vanilla, Cedarwood & Sage, Fresh Linen. 40-hour burn time each. Clean non-toxic burn.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600',
    category: 'Home',
    seller: sellerIds[1],
    rating: 4.9,
    reviews: 734,
    stock: 80
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users (password hashed via pre-save hook)
    const createdUsers = await User.create(users);
    const sellerIds = createdUsers.map(u => u._id);
    console.log(`👤 Created ${createdUsers.length} users`);

    // Create products
    const products = getProducts(sellerIds);
    await Product.create(products);
    console.log(`📦 Created ${products.length} products`);

    console.log('\n✅ Seed completed successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Test Credentials:');
    console.log('  User 1: alice@example.com / password123');
    console.log('  User 2: bob@example.com   / password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
