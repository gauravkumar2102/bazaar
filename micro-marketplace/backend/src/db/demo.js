import mongoose from "mongoose";
import Product from "../models/Product.js";
import User from "../models/User.js";
import demoPro from "./sample-products.js";

function ProductDatabase() {
    mongoose.connect("mongodb+srv://singhkhushboo:singhKhushboo123@market-place.lu0qxwp.mongodb.net/?appName=market-place").then(async () => {
        console.log("Connected to MongoDB");
        await seedProducts();
        process.exit(0); // Exit after seeding
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

    async function seedProducts() {
        try {
            await Product.deleteMany({});
            console.log("Existing products cleared");

            // Create a test seller user
            let seller = await User.findOne({ email: "seller@test.com" });
            if (!seller) {
                seller = await User.create({
                    name: "Test Seller",
                    email: "seller@test.com",
                    password: "test123" // Hash this properly in production
                });
            }

            // Add seller ID to all products
            const productsWithSeller = demoPro.map(product => ({
                ...product,
                seller: seller._id
            }));

            const result = await Product.insertMany(productsWithSeller);
            console.log(`${result.length} products inserted successfully`);
        } catch (err) {
            console.error("Error seeding products:", err);
        }
    }
}

ProductDatabase();
