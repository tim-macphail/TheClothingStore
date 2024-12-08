// src/scripts/importMockData.ts
import { AppDataSource } from "../data-source";

const mockItems = [
    {
        name: "T-Shirt",
        description: "Comfortable Casual T-Shirt",
        price: 29.99,
        stock_quantity: 50,
        category: "shirts",
        size: "Medium",
        color: "Black",
        image_url: "http://localhost:8080/cshirts/shirt1.webp",
    },
    {
        name: "Pants",
        description: "Stylish Casual Pants",
        price: 59.99,
        stock_quantity: 50,
        category: "pants",
        size: "Medium",
        color: "Black",
        image_url: "http://localhost:8080/pants/pants.webp",
    },
    {
        name: "Running Shoes",
        description: "Comfortable Running Shoes",
        price: 119.99,
        stock_quantity: 50,
        category: "running",
        size: "Medium",
        color: "Black",
        image_url: "http://localhost:8080/running/runningshoes.png",
    },
    {
        name: "Skiing Helmet",
        description: "Functional Helmet, Ideal for Skiing",
        price: 300,
        stock_quantity: 50,
        category: "skiing",
        size: "Medium",
        color: "Black",
        image_url: "http://localhost:8080/skiing/skiinghelmet.jpg",
    },
    {
        name: "Jersey",
        description: "Trendy Jersey for Basketball",
        price: 100,
        stock_quantity: 50,
        category: "basketball",
        size: "Medium",
        color: "Purple",
        image_url: "http://localhost:8080/basketball/bballjersey.jpg",
    },
    {
        name: "Shorts",
        description: "Athletic Shorts",
        price: 25.99,
        stock_quantity: 50,
        category: "basketball",
        size: "Medium",
        color: "Green",
        image_url: "http://localhost:8080/basketball/bballshorts.webp",
    },
    {
        name: "Basketball Shirt",
        description: "Comfortable T-Shirt, Ideal for Basketball",
        price: 72.99,
        stock_quantity: 50,
        category: "basketball",
        size: "Medium",
        color: "Navy Blue",
        image_url: "http://localhost:8080/basketball/bballtshirt.webp",
    },
    {
        name: "Long Sleeve Shirt",
        description: "Comfortable Long Sleeve Shirt",
        price: 60,
        stock_quantity: 50,
        category: "shirts",
        size: "Large",
        color: "Black",
        image_url: "http://localhost:8080/cshirts/shirt3.jpg",
    },
    {
        name: "Sweatpants",
        description: "Relaxed Fit Sweatpants",
        price: 44,
        stock_quantity: 50,
        category: "pants",
        size: "Medium",
        color: "Green",
        image_url: "http://localhost:8080/pants/pants2.webp",
    },
    {
        name: "Jeans",
        description: "Stylish Jeans",
        price: 80,
        stock_quantity: 50,
        category: "pants",
        size: "Medium",
        color: "Blue",
        image_url: "http://localhost:8080/pants/pants3.jpg",
    },
    {
        name: "Striped Sweater",
        description: "Stylish Sweater",
        price: 90,
        stock_quantity: 50,
        category: "sweaters",
        size: "Medium",
        color: "Beige",
        image_url: "http://localhost:8080/sweaters/sweater2.webp",
    },
    {
        name: "Dark Jeans",
        description: "Stylish Jeans",
        price: 75,
        stock_quantity: 50,
        category: "pants",
        size: "Medium",
        color: "Black",
        image_url: "http://localhost:8080/pants/pants4.webp",
    },
    {
        name: "Running Jacket",
        description: "Weatherproof Jacket",
        price: 200,
        stock_quantity: 50,
        category: "running",
        size: "Medium",
        color: "Blue",
        image_url: "http://localhost:8080/running/runningjacket.webp",
    },
    {
        name: "Polo Shirt",
        description: "Trendy Polo Shirt",
        price: 130.99,
        stock_quantity: 50,
        category: "shirts",
        size: "Small",
        color: "Blue",
        image_url: "http://localhost:8080/cshirts/shirt2.webp",
    },
    {
        name: "Dress Shirt",
        description: "Elegant Dress Shirt",
        price: 110,
        stock_quantity: 50,
        category: "formal-shirts",
        size: "Medium",
        color: "White",
        image_url: "http://localhost:8080/formal-shirts/fshirt1.webp",
    },
    {
        name: "Dress Shirt",
        description: "Elegant Dress Shirt",
        price: 140,
        stock_quantity: 50,
        category: "formal-shirts",
        size: "Medium",
        color: "Black",
        image_url: "http://localhost:8080/formal-shirts/fshirt3.webp",
    },
    {
        name: "Knit Sweater",
        description: "Warm and Elegant Sweater",
        price: 90,
        stock_quantity: 50,
        category: "sweaters",
        size: "Medium",
        color: "Beige",
        image_url: "http://localhost:8080/sweaters/sweater1.jpg",
    }
];

const importData = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Connected to database");

        // Clear all tables with CASCADE
        await AppDataSource.query(`
            TRUNCATE TABLE order_items, cart, products CASCADE;
        `);

        console.log("Cleared existing data");

        // Insert products
        for (const item of mockItems) {
            await AppDataSource.query(`
                INSERT INTO products (name, description, price, stock_quantity, category, size, color, image_url, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            `, [item.name, item.description, item.price, item.stock_quantity, item.category, item.size, item.color, item.image_url]);

            console.log(`Added product: ${item.name}`);
        }

        console.log("All products imported successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error importing data:", error);
        process.exit(1);
    }
};

importData();