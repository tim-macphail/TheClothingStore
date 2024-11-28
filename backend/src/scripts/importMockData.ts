// src/scripts/importMockData.ts
import { AppDataSource } from "../data-source";

const mockItems = [
    {
        name: "T-Shirt",
        description: "Comfortable casual t-shirt",
        price: 100,
        stock_quantity: 50,
        category: "shirts",
        size: "medium",
        color: "black",
        image_url: "http://localhost:8080/cshirts/shirt1.webp",
    },
    {
        name: "Pants",
        description: "Stylish Casual Pants",
        price: 200,
        stock_quantity: 50,
        category: "pants",
        size: "medium",
        color: "black",
        image_url: "http://localhost:8080/pants/pants.webp",
    },
    {
        name: "Running Shoes",
        description: "Comfortable Running Shoes",
        price: 300,
        stock_quantity: 50,
        category: "running",
        size: "medium",
        color: "black",
        image_url: "http://localhost:8080/running/runningshoes.png",
    },
    {
        name: "Skiing Helmet",
        description: "Functional Helmet",
        price: 400,
        stock_quantity: 50,
        category: "skiing",
        size: "medium",
        color: "black",
        image_url: "http://localhost:8080/skiing/skiinghelmet.jpg",
    },
    {
        name: "Jersey",
        description: "Trendy Jersey",
        price: 500,
        stock_quantity: 50,
        category: "basketball",
        size: "medium",
        color: "purple",
        image_url: "http://localhost:8080/basketball/bballjersey.jpg",
    },
    {
        name: "Shorts",
        description: "Athletic Shorts",
        price: 600,
        stock_quantity: 50,
        category: "basketball",
        size: "medium",
        color: "green",
        image_url: "http://localhost:8080/basketball/bballshorts.webp",
    },
    {
        name: "Basketball Shirt",
        description: "Comfortable T-Shirt",
        price: 700,
        stock_quantity: 50,
        category: "basketball",
        size: "medium",
        color: "navy blue",
        image_url: "http://localhost:8080/basketball/bballtshirt.webp",
    },
    {
        name: "Long Sleeve Shirt",
        description: "Comfortable Long Sleeve Shirt",
        price: 800,
        stock_quantity: 50,
        category: "shirts",
        size: "large",
        color: "black",
        image_url: "http://localhost:8080/cshirts/shirt3.jpg",
    },
    {
        name: "Sweatpants",
        description: "Relaxed Fit Sweatpants",
        price: 900,
        stock_quantity: 50,
        category: "pants",
        size: "medium",
        color: "green",
        image_url: "http://localhost:8080/pants/pants2.webp",
    },
    {
        name: "Jeans",
        description: "Stylish Jeans",
        price: 1000,
        stock_quantity: 50,
        category: "pants",
        size: "medium",
        color: "blue",
        image_url: "http://localhost:8080/pants/pants3.jpg",
    },
    {
        name: "Striped Sweater",
        description: "Stylish Sweater",
        price: 1100,
        stock_quantity: 50,
        category: "sweaters",
        size: "medium",
        color: "beige",
        image_url: "http://localhost:8080/sweaters/sweater2.webp",
    },
    {
        name: "Dark Jeans",
        description: "Stylish Jeans",
        price: 1200,
        stock_quantity: 50,
        category: "pants",
        size: "medium",
        color: "black",
        image_url: "http://localhost:8080/pants/pants4.webp",
    },
    {
        name: "Running Jacket",
        description: "Weatherproof Jacket",
        price: 1300,
        stock_quantity: 50,
        category: "running",
        size: "medium",
        color: "blue",
        image_url: "http://localhost:8080/running/runningjacket.webp",
    },
    {
        name: "Polo Shirt",
        description: "Trendy Polo Shirt",
        price: 1400,
        stock_quantity: 50,
        category: "shirts",
        size: "small",
        color: "blue",
        image_url: "http://localhost:8080/cshirts/shirt2.webp",
    },
    {
        name: "Dress Shirt",
        description: "Elegant Dress Shirt",
        price: 1500,
        stock_quantity: 50,
        category: "dressshirts",
        size: "medium",
        color: "white",
        image_url: "http://localhost:8080/formalshirts/fshirt1.webp",
    },
    {
        name: "Dress Shirt",
        description: "Elegant Dress Shirt",
        price: 1600,
        stock_quantity: 50,
        category: "dressshirt",
        size: "medium",
        color: "black",
        image_url: "http://localhost:8080/formalshirts/fshirt3.webp",
    },
    {
        name: "Knit Sweater",
        description: "Warm and Elegant Sweater",
        price: 1700,
        stock_quantity: 50,
        category: "sweaters",
        size: "medium",
        color: "beige",
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