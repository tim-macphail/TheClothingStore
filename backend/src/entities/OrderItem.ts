import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity("order_items")
export class OrderItem {
    constructor() {
        this.order_id = 0;
        this.product_id = 0;
        this.quantity = 0;
        this.price_at_time = 0;
        this.created_at = new Date();
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    order_id: number;

    @Column()
    product_id: number;

    @Column()
    quantity: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price_at_time: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Order)
    @JoinColumn({ name: "order_id" })
    order!: Order;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product!: Product;
}