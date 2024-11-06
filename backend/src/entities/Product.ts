import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("products")
export class Product {
    constructor() {
        this.name = "";
        this.description = "";
        this.price = 0;
        this.stock_quantity = 0;
        this.category = "";
        this.size = "";
        this.color = "";
        this.image_url = "";
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;

    @Column()
    stock_quantity: number;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    size: string;

    @Column({ nullable: true })
    color: string;

    @Column({ nullable: true })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}