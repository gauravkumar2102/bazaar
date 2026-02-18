const products = [
  // ======================== ELECTRONICS (12 products) ========================
  {
    title: "AirFlow Pro Wireless Earbuds",
    price: 149.99,
    description: "Premium wireless earbuds with active noise cancellation, 32-hour battery life with charging case, IPX7 water resistance, and crystal-clear call quality. Features touch controls, Bluetooth 5.3, and seamless device switching.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
    category: "Electronics",
    rating: 4.7,
    reviews: 3842,
    stock: 127
  },
  {
    title: "StreamPro 4K Webcam with Ring Light",
    price: 139.99,
    description: "Professional 4K webcam with built-in adjustable ring light and dual microphones. Features auto-focus, 90° wide angle, and HDR. Perfect for streaming, video calls, and content creation.",
    image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800",
    category: "Electronics",
    rating: 4.6,
    reviews: 3241,
    stock: 89
  },
  {
    title: "UltraCharge 65W GaN Fast Charger",
    price: 49.99,
    description: "Compact GaN technology charger with 3 USB-C ports and 1 USB-A. Charges laptops, phones, and tablets simultaneously. Foldable plug design, universal compatibility, includes 6ft USB-C cable.",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800",
    category: "Electronics",
    rating: 4.8,
    reviews: 5672,
    stock: 203
  },
  {
    title: "Smart Watch Pro Series 8",
    price: 399.99,
    description: "Advanced fitness tracker with ECG, blood oxygen monitoring, sleep tracking, and 50+ workout modes. Always-on AMOLED display, 7-day battery, water-resistant to 50m. Works with iOS and Android.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
    category: "Electronics",
    rating: 4.5,
    reviews: 8934,
    stock: 156
  },
  {
    title: "Portable SSD 2TB - Thunderbolt 3",
    price: 279.99,
    description: "Ultra-fast portable solid state drive with read speeds up to 2800MB/s. Shock-resistant, compact aluminum design. Perfect for video editors, photographers, and gamers. Includes USB-C and Thunderbolt cables.",
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800",
    category: "Electronics",
    rating: 4.9,
    reviews: 2156,
    stock: 94
  },
  {
    title: "Wireless Gaming Mouse RGB",
    price: 89.99,
    description: "Precision gaming mouse with 20,000 DPI sensor, 11 programmable buttons, and customizable RGB lighting. 70-hour battery life, wireless charging compatible. Ergonomic design with textured grip.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
    category: "Electronics",
    rating: 4.7,
    reviews: 4521,
    stock: 112
  },
  {
    title: "Smart Home Hub with Display",
    price: 179.99,
    description: "10-inch touchscreen smart display for home automation. Voice control, video calls, recipe display, and controls all smart home devices. Built-in camera with privacy shutter.",
    image: "https://images.unsplash.com/photo-1558089687-e460efad2c58?w=800",
    category: "Electronics",
    rating: 4.4,
    reviews: 3167,
    stock: 67
  },
  {
    title: "Drone 4K Camera Quadcopter",
    price: 499.99,
    description: "Professional drone with 4K60fps camera, 3-axis gimbal stabilization, and 35-minute flight time. GPS auto-return, obstacle avoidance, and follow-me mode. Foldable design with carrying case.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
    category: "Electronics",
    rating: 4.6,
    reviews: 1843,
    stock: 43
  },
  {
    title: "USB-C Docking Station 14-in-1",
    price: 129.99,
    description: "Ultimate connectivity hub with dual 4K HDMI, Ethernet, SD/microSD readers, USB 3.0 ports, audio jack, and 100W power delivery. Compatible with all USB-C laptops and tablets.",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800",
    category: "Electronics",
    rating: 4.5,
    reviews: 2934,
    stock: 145
  },
  {
    title: "Wireless Presentation Remote",
    price: 34.99,
    description: "Professional presenter remote with laser pointer, 100ft range, and vibration timer alerts. Plug-and-play USB receiver, intuitive controls. Perfect for teachers and business professionals.",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800",
    category: "Electronics",
    rating: 4.6,
    reviews: 1567,
    stock: 198
  },
  {
    title: "Bluetooth Speaker Waterproof 360°",
    price: 79.99,
    description: "Portable Bluetooth speaker with 360° sound, 20-hour battery, and IPX7 waterproof rating. Deep bass, crystal highs, party mode to connect multiple speakers. Includes carabiner clip.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    category: "Electronics",
    rating: 4.8,
    reviews: 6234,
    stock: 187
  },
  {
    title: "E-Reader 7-inch Paperwhite",
    price: 149.99,
    description: "Glare-free 300 PPI display with adjustable warm light. Waterproof design, weeks of battery life, stores thousands of books. Includes 3 months of unlimited reading subscription.",
    image: "https://images.unsplash.com/photo-1544716278-e513176f20b5?w=800",
    category: "Electronics",
    rating: 4.7,
    reviews: 15672,
    stock: 234
  },

  // ======================== CLOTHING (10 products) ========================
  {
    title: "Vintage Wash Oversized Denim Jacket",
    price: 79.99,
    description: "Classic oversized denim jacket with vintage stone wash finish. 100% premium cotton denim with relaxed boyfriend fit. Features button-front closure, chest pockets, and adjustable cuffs. Available in sizes XS-XXL.",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800",
    category: "Clothing",
    rating: 4.5,
    reviews: 1247,
    stock: 68
  },
  {
    title: "Merino Wool Crewneck Sweater",
    price: 89.99,
    description: "Luxuriously soft merino wool sweater in classic crewneck style. Breathable, temperature-regulating, and naturally odor-resistant. Ribbed collar, cuffs, and hem. Machine washable. Unisex sizing.",
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800",
    category: "Clothing",
    rating: 4.8,
    reviews: 3421,
    stock: 156
  },
  {
    title: "Athletic Performance Leggings",
    price: 54.99,
    description: "High-waisted leggings with compression fit and moisture-wicking fabric. Four-way stretch, squat-proof, with hidden pocket. Perfect for yoga, running, or everyday wear. Available in 15 colors.",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800",
    category: "Clothing",
    rating: 4.9,
    reviews: 8932,
    stock: 312
  },
  {
    title: "Classic White Oxford Button-Down",
    price: 65.00,
    description: "Timeless oxford cloth button-down shirt in pure cotton. Tailored fit with button-down collar, chest pocket, and box pleat back. Pre-washed for softness. Essential wardrobe staple.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
    category: "Clothing",
    rating: 4.6,
    reviews: 2167,
    stock: 189
  },
  {
    title: "Waterproof Hiking Jacket",
    price: 139.99,
    description: "3-layer waterproof breathable shell with sealed seams and adjustable hood. Multiple pockets, underarm vents, and adjustable cuffs. Packable design with stuff sack. Perfect for outdoor adventures.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    category: "Clothing",
    rating: 4.7,
    reviews: 4523,
    stock: 93
  },
  {
    title: "Cashmere Blend Scarf",
    price: 78.00,
    description: "Luxurious scarf in 80% cashmere and 20% silk blend. Extra-long design (78\" x 28\") for versatile styling. Incredibly soft with elegant fringe detail. Available in 8 sophisticated colors.",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800",
    category: "Clothing",
    rating: 4.9,
    reviews: 1834,
    stock: 145
  },
  {
    title: "Slim Fit Chino Pants",
    price: 69.99,
    description: "Modern slim-fit chinos in stretch cotton twill. Classic 5-pocket styling with zip fly. Wrinkle-resistant finish, perfect for work or weekend. Available in 6 versatile colors and waist sizes 28-40.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
    category: "Clothing",
    rating: 4.5,
    reviews: 5672,
    stock: 278
  },
  {
    title: "Bamboo Fiber T-Shirt 3-Pack",
    price: 44.99,
    description: "Ultra-soft bamboo fiber t-shirts that are eco-friendly and hypoallergenic. Naturally moisture-wicking and temperature-regulating. Classic crew neck, tagless comfort. Includes black, white, and gray.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    category: "Clothing",
    rating: 4.7,
    reviews: 6834,
    stock: 421
  },
  {
    title: "Leather Biker Jacket",
    price: 299.99,
    description: "Genuine leather motorcycle jacket with asymmetric zipper, snap collar, and quilted shoulders. Fully lined with interior pockets. Classic moto styling that never goes out of fashion. Sizes XS-3XL.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    category: "Clothing",
    rating: 4.8,
    reviews: 2156,
    stock: 54
  },
  {
    title: "Cashmere Knit Beanie",
    price: 38.00,
    description: "100% pure cashmere beanie with ribbed knit pattern. Supremely soft and warm without bulk. Fold-up cuff design, one size fits most. Available in 6 classic colors. Hand wash recommended.",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800",
    category: "Clothing",
    rating: 4.6,
    reviews: 3421,
    stock: 267
  },

  // ======================== HOME (10 products) ========================
  {
    title: "BrewGenius Smart Coffee Maker",
    price: 199.99,
    description: "WiFi-enabled programmable coffee maker with companion app. Brew from anywhere, schedule morning coffee, and customize strength and temperature. Thermal carafe keeps coffee hot for 4 hours. 12-cup capacity.",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800",
    category: "Home",
    rating: 4.8,
    reviews: 5621,
    stock: 42
  },
  {
    title: "Minimalist Ceramic Planter Set (3 Pieces)",
    price: 54.99,
    description: "Handcrafted ceramic planters in matte white finish with drainage holes and bamboo saucers. Includes small (4\"), medium (6\"), and large (8\") pots. Perfect for succulents and indoor plants.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    category: "Home",
    rating: 4.7,
    reviews: 1687,
    stock: 103
  },
  {
    title: "Memory Foam Pillow - Adjustable Loft",
    price: 69.99,
    description: "Premium shredded memory foam pillow with removable fill for customized height. Bamboo-derived cooling cover, hypoallergenic, and machine washable. Supports all sleep positions. Queen size.",
    image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800",
    category: "Home",
    rating: 4.9,
    reviews: 12453,
    stock: 289
  },
  {
    title: "Weighted Blanket 15lb Queen Size",
    price: 89.99,
    description: "Premium weighted blanket with glass beads evenly distributed in small pockets. Promotes deeper sleep and reduces anxiety. Soft minky cover, 7-layer construction. Includes duvet cover. 60x80 inches.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
    category: "Home",
    rating: 4.8,
    reviews: 8734,
    stock: 156
  },
  {
    title: "Himalayan Salt Lamp Large",
    price: 44.99,
    description: "Hand-carved authentic Himalayan pink salt lamp (8-10 lbs) with wooden base and dimmable switch. Creates ambient glow, natural air purifier. Includes extra bulb. Each lamp is unique.",
    image: "https://images.unsplash.com/photo-1615529162924-f89c10a1f7e5?w=800",
    category: "Home",
    rating: 4.6,
    reviews: 4521,
    stock: 178
  },
  {
    title: "Stainless Steel Cookware Set 10-Piece",
    price: 299.99,
    description: "Professional-grade tri-ply stainless steel cookware with aluminum core for even heating. Includes saucepans, stockpot, skillets, and lids. Oven-safe to 500°F, dishwasher safe, induction compatible.",
    image: "https://images.unsplash.com/photo-1565183928294-7d22f2d8454f?w=800",
    category: "Home",
    rating: 4.9,
    reviews: 3245,
    stock: 67
  },
  {
    title: "Robot Vacuum with Mapping Technology",
    price: 349.99,
    description: "Smart robot vacuum with laser navigation and room mapping. 2700Pa suction, self-charging, app control, and voice assistant compatibility. Anti-collision sensors, works on all floor types.",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800",
    category: "Home",
    rating: 4.7,
    reviews: 9834,
    stock: 94
  },
  {
    title: "Bamboo Sheet Set Queen - 400 Thread Count",
    price: 119.99,
    description: "Luxurious bamboo-derived rayon sheets that are softer than cotton. Naturally moisture-wicking, hypoallergenic, and temperature-regulating. Deep pockets fit mattresses up to 18\". Includes flat, fitted, and 2 pillowcases.",
    image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800",
    category: "Home",
    rating: 4.8,
    reviews: 6723,
    stock: 234
  },
  {
    title: "Essential Oil Diffuser Ultrasonic",
    price: 39.99,
    description: "400ml capacity ultrasonic aromatherapy diffuser with 7-color LED lights and 4 timer settings. Whisper-quiet operation, auto shut-off, BPA-free. Includes starter set of 6 essential oils.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
    category: "Home",
    rating: 4.6,
    reviews: 11234,
    stock: 312
  },
  {
    title: "Wall-Mounted Floating Shelves Set of 3",
    price: 59.99,
    description: "Rustic wood floating shelves with invisible brackets. Solid pine construction in weathered gray finish. Set includes 24\", 18\", and 12\" shelves. All mounting hardware included. Weight capacity 50 lbs each.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800",
    category: "Home",
    rating: 4.5,
    reviews: 3876,
    stock: 189
  },

  // ======================== BOOKS (8 products) ========================
  {
    title: "The Midnight Library (Hardcover)",
    price: 26.99,
    description: "Between life and death there is a library. Every book provides a chance to try another life. A dazzling novel about all the choices that go into a life well lived, from internationally bestselling author Matt Haig.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800",
    category: "Books",
    rating: 4.9,
    reviews: 18234,
    stock: 312
  },
  {
    title: "Atomic Habits - Tiny Changes, Remarkable Results",
    price: 27.00,
    description: "Transform your life with the #1 New York Times bestseller. Learn how tiny changes can lead to remarkable results. Practical strategies to build good habits and break bad ones. Over 10 million copies sold worldwide.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800",
    category: "Books",
    rating: 4.9,
    reviews: 43521,
    stock: 487
  },
  {
    title: "The Psychology of Money",
    price: 24.99,
    description: "Timeless lessons on wealth, greed, and happiness. Learn how to think about money in a way that changes your life. Wall Street Journal bestseller with 19 short stories exploring the strange ways people think about money.",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800",
    category: "Books",
    rating: 4.8,
    reviews: 28934,
    stock: 356
  },
  {
    title: "Becoming - Michelle Obama (Paperback)",
    price: 18.99,
    description: "Intimate memoir by former First Lady Michelle Obama. Chronicles her journey from the South Side of Chicago to the White House. Over 14 million copies sold. Now in paperback with new introduction.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
    category: "Books",
    rating: 4.9,
    reviews: 67834,
    stock: 523
  },
  {
    title: "Dune: Deluxe Edition",
    price: 35.00,
    description: "Frank Herbert's science fiction masterpiece in stunning deluxe hardcover. Set on the desert planet Arrakis, an epic tale of politics, religion, and ecology. Includes exclusive artwork and author notes.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
    category: "Books",
    rating: 4.8,
    reviews: 15672,
    stock: 198
  },
  {
    title: "The Cookbook - 500 Classic Recipes",
    price: 39.99,
    description: "Comprehensive cookbook with 500 tried-and-tested recipes from around the world. Step-by-step photos, cooking techniques, and essential kitchen skills. Perfect for beginners and experienced cooks alike.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    category: "Books",
    rating: 4.7,
    reviews: 9234,
    stock: 267
  },
  {
    title: "Where the Crawdads Sing",
    price: 16.99,
    description: "Over 12 million copies sold. A hauntingly beautiful novel about a mysterious woman in the marshes. Coming-of-age murder mystery that spent years on the bestseller lists. Now in mass market paperback.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
    category: "Books",
    rating: 4.8,
    reviews: 89234,
    stock: 634
  },
  {
    title: "The Art of War - Illustrated Edition",
    price: 22.99,
    description: "Sun Tzu's ancient Chinese military treatise beautifully illustrated. Timeless strategies for leadership, competition, and conflict resolution. Includes historical context and modern applications in business.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800",
    category: "Books",
    rating: 4.6,
    reviews: 12456,
    stock: 289
  },

  // ======================== SPORTS (8 products) ========================
  {
    title: "Premium Resistance Bands Set (5 Levels)",
    price: 34.99,
    description: "Professional resistance band set with 5 color-coded levels (10-50 lbs). Includes door anchor, ankle straps, foam handles, and carrying bag. Natural latex, perfect for strength training and physical therapy.",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800",
    category: "Sports",
    rating: 4.6,
    reviews: 2876,
    stock: 94
  },
  {
    title: "Yoga Mat Pro - Extra Thick 6mm",
    price: 44.99,
    description: "Extra-thick eco-friendly TPE yoga mat with superior cushioning. Non-slip texture on both sides, 183cm × 61cm. Includes carrying strap. Perfect for all yoga styles, pilates, and floor exercises.",
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800",
    category: "Sports",
    rating: 4.7,
    reviews: 1120,
    stock: 75
  },
  {
    title: "Adjustable Dumbbell Set 5-52.5 lbs",
    price: 349.99,
    description: "Space-saving adjustable dumbbells replace 15 sets. Dial to select weight from 5 to 52.5 lbs per dumbbell. Durable construction with textured handles. Includes storage tray. Perfect for home gym.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    category: "Sports",
    rating: 4.9,
    reviews: 8923,
    stock: 43
  },
  {
    title: "Running Shoes - CloudTech Cushioning",
    price: 129.99,
    description: "Performance running shoes with advanced CloudTech cushioning system. Breathable mesh upper, responsive midsole, durable outsole. Suitable for road and treadmill. Available in men's and women's sizes 6-14.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    category: "Sports",
    rating: 4.6,
    reviews: 5234,
    stock: 178
  },
  {
    title: "Professional Jump Rope with Counter",
    price: 24.99,
    description: "Weighted jump rope with digital counter and calorie tracker. Adjustable length, comfortable foam handles, tangle-free design. Perfect for cardio workouts, boxing training, and weight loss.",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800",
    category: "Sports",
    rating: 4.5,
    reviews: 3467,
    stock: 234
  },
  {
    title: "Foam Roller for Muscle Recovery",
    price: 29.99,
    description: "High-density foam roller for deep tissue massage and myofascial release. 13\" x 6\" size, textured surface for trigger point therapy. Lightweight and durable. Includes exercise guide.",
    image: "https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800",
    category: "Sports",
    rating: 4.7,
    reviews: 6734,
    stock: 312
  },
  {
    title: "Insulated Sports Water Bottle 32oz",
    price: 34.99,
    description: "Vacuum-insulated stainless steel bottle keeps drinks cold 24 hours or hot 12 hours. Leak-proof lid with carry handle, wide mouth for ice cubes. BPA-free, dishwasher safe. Available in 8 colors.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
    category: "Sports",
    rating: 4.8,
    reviews: 15234,
    stock: 456
  },
  {
    title: "Wireless Heart Rate Monitor Chest Strap",
    price: 59.99,
    description: "Accurate heart rate monitoring with Bluetooth and ANT+ connectivity. Comfortable adjustable strap, waterproof design. Compatible with fitness apps and smartwatches. Battery lasts up to 2 years.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800",
    category: "Sports",
    rating: 4.6,
    reviews: 2934,
    stock: 167
  },

  // ======================== BEAUTY (6 products) ========================
  {
    title: "Radiance Restore Luxury Skincare Set",
    price: 89.99,
    description: "Complete 4-step Korean skincare routine with hyaluronic acid serum, vitamin C cream, retinol night treatment, and gentle cleanser. Clinically proven to reduce fine lines by 47% in 8 weeks. Cruelty-free.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
    category: "Beauty",
    rating: 4.7,
    reviews: 4102,
    stock: 156
  },
  {
    title: "Ionic Hair Dryer Professional 1875W",
    price: 79.99,
    description: "Salon-quality hair dryer with negative ionic technology for frizz-free shine. 3 heat and 2 speed settings, cool shot button. Includes concentrator and diffuser attachments. Lightweight and quiet.",
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800",
    category: "Beauty",
    rating: 4.8,
    reviews: 8234,
    stock: 123
  },
  {
    title: "Makeup Brush Set Professional 24-Piece",
    price: 49.99,
    description: "Complete makeup brush collection with synthetic and natural bristles. Includes face brushes, eye brushes, and blending tools. Vegan, cruelty-free. Comes with designer carrying case and brush cleaner.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800",
    category: "Beauty",
    rating: 4.6,
    reviews: 5673,
    stock: 198
  },
  {
    title: "LED Light Therapy Face Mask",
    price: 199.99,
    description: "Advanced LED facial treatment with 7 light wavelengths. Reduces wrinkles, acne, and hyperpigmentation. 10-minute treatments, FDA-cleared technology. Includes protective goggles and travel case.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800",
    category: "Beauty",
    rating: 4.5,
    reviews: 3421,
    stock: 67
  },
  {
    title: "Natural Mineral Sunscreen SPF 50",
    price: 32.00,
    description: "Reef-safe zinc oxide sunscreen with broad-spectrum protection. Non-greasy, water-resistant 80 minutes. Tinted formula for all skin tones. Vegan, cruelty-free, hypoallergenic. 3 oz tube.",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800",
    category: "Beauty",
    rating: 4.7,
    reviews: 9234,
    stock: 287
  },
  {
    title: "Jade Roller & Gua Sha Set",
    price: 28.00,
    description: "Authentic jade facial massage tools for lymphatic drainage and de-puffing. Promotes circulation, reduces wrinkles, enhances product absorption. Includes storage pouch and instruction guide.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
    category: "Beauty",
    rating: 4.6,
    reviews: 6734,
    stock: 234
  },

  // ======================== TOYS (4 products) ========================
  {
    title: "CodeBot Jr. - Programming Robot Kit",
    price: 119.99,
    description: "Award-winning STEM robot for ages 8+. Build and program using drag-and-drop interface. 300+ pieces, sensors, motors, LED lights. Teaches coding, problem-solving, engineering. iOS/Android compatible.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    category: "Toys",
    rating: 4.9,
    reviews: 1534,
    stock: 73
  },
  {
    title: "LEGO Architecture Skyline Collection",
    price: 74.99,
    description: "Build iconic city skyline with 598 pieces including famous landmarks. Ages 12+. Perfect display model and creative building experience. Includes booklet with history and design details.",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
    category: "Toys",
    rating: 4.8,
    reviews: 673,
    stock: 40
  },
  {
    title: "Magnetic Building Tiles Set 100-Piece",
    price: 64.99,
    description: "Educational magnetic construction tiles in vibrant colors. Build 3D structures, develop spatial skills and creativity. Safe ABS plastic, strong magnets. Ages 3+. Includes idea booklet and storage box.",
    image: "https://images.unsplash.com/photo-1558877385-1b7e2e4c318b?w=800",
    category: "Toys",
    rating: 4.9,
    reviews: 8234,
    stock: 167
  },
  {
    title: "Science Lab Kit - 150+ Experiments",
    price: 89.99,
    description: "Complete science experiment kit for kids 8-14. Includes chemistry, physics, and biology experiments. All equipment, chemicals, and safety gear included. Detailed instruction manual with STEM lessons.",
    image: "https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?w=800",
    category: "Toys",
    rating: 4.7,
    reviews: 4562,
    stock: 94
  },

  // ======================== FOOD (2 products) ========================
  {
    title: "Organic Cold Brew Coffee Concentrate",
    price: 18.99,
    description: "Smooth, bold organic cold brew concentrate. 32oz bottle makes 64oz coffee. Fair-trade certified, low acidity, single origin Ethiopian beans. Just add water or milk. Stays fresh 2 weeks refrigerated.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800",
    category: "Food",
    rating: 4.6,
    reviews: 2189,
    stock: 300
  },
  {
    title: "Tuscan Gold Extra Virgin Olive Oil",
    price: 42.00,
    description: "Single-estate EVOO from century-old Tuscan groves. Cold-pressed within 4 hours of harvest, certified organic. Robust peppery finish with fruity notes. 500ml dark glass bottle preserves freshness.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800",
    category: "Food",
    rating: 4.8,
    reviews: 892,
    stock: 218
  }
];

export default products;