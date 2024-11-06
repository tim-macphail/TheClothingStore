import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Product } from "./entities/Product"
import { Order } from "./entities/Order"
import { OrderItem } from "./entities/OrderItem"
import { Cart } from "./entities/Cart"
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "clothingstore",
    synchronize: true,
    logging: true,
    entities: [User, Product, Order, OrderItem, Cart],
    migrations: [],
    subscribers: [],
})