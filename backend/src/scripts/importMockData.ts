// src/scripts/importMockData.ts
import { AppDataSource } from "../data-source";

const mockItems = [
    {
        name: "t-shirt",
        description: "Comfortable casual t-shirt",
        price: 100,
        stock_quantity: 50,
        category: "t-shirt",
        size: "medium",
        color: "blue",
    },
    {
        name: "pants",
        description: "Stylish casual pants",
        price: 200,
        stock_quantity: 50,
        category: "pants",
        size: "medium",
        color: "blue",
    },
    {
        name: "shoes",
        description: "Comfortable casual shoes",
        price: 300,
        stock_quantity: 50,
        category: "shoes",
        size: "medium",
        color: "blue",
    },
    {
        name: "hat",
        description: "Fashionable hat",
        price: 400,
        stock_quantity: 50,
        category: "hat",
        size: "medium",
        color: "blue",
    },
    {
        name: "gloves",
        description: "Warm winter gloves",
        price: 500,
        stock_quantity: 50,
        category: "gloves",
        size: "medium",
        color: "blue",
    },
    {
        name: "scarf",
        description: "Cozy winter scarf",
        price: 600,
        stock_quantity: 50,
        category: "scarf",
        size: "medium",
        color: "blue",
    },
    {
        name: "belt",
        description: "Leather belt",
        price: 700,
        stock_quantity: 50,
        category: "belt",
        size: "medium",
        color: "blue",
    },
    {
        name: "socks",
        description: "Comfortable cotton socks",
        price: 800,
        stock_quantity: 50,
        category: "socks",
        size: "medium",
        color: "blue",
    },
    {
        name: "watch",
        description: "Stylish wristwatch",
        price: 900,
        stock_quantity: 50,
        category: "watch",
        size: "medium",
        color: "blue",
    },
    {
        name: "bracelet",
        description: "Elegant bracelet",
        price: 1000,
        stock_quantity: 50,
        category: "bracelet",
        size: "medium",
        color: "blue",
    },
    {
        name: "necklace",
        description: "Beautiful necklace",
        price: 1100,
        stock_quantity: 50,
        category: "necklace",
        size: "medium",
        color: "blue",
    },
    {
        name: "earrings",
        description: "Stylish earrings",
        price: 1200,
        stock_quantity: 50,
        category: "earrings",
        size: "medium",
        color: "blue",
    },
    {
        name: "ring",
        description: "Elegant ring",
        price: 1300,
        stock_quantity: 50,
        category: "ring",
        size: "medium",
        color: "blue",
    },
    {
        name: "sunglasses",
        description: "Trendy sunglasses",
        price: 1400,
        stock_quantity: 50,
        category: "sunglasses",
        size: "medium",
        color: "blue",
    },
    {
        name: "backpack",
        description: "Spacious backpack",
        price: 1500,
        stock_quantity: 50,
        category: "backpack",
        size: "medium",
        color: "blue",
    },
    {
        name: "purse",
        description: "Elegant purse",
        price: 1600,
        stock_quantity: 50,
        category: "purse",
        size: "medium",
        color: "blue",
    },
    {
        name: "wallet",
        description: "Leather wallet",
        price: 1700,
        stock_quantity: 50,
        category: "wallet",
        size: "medium",
        color: "blue",
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
            `, [item.name, item.description, item.price, item.stock_quantity, item.category, item.size, item.color, ""]);
            
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