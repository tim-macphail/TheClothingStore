import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity("cart")
export class Cart {
    constructor() {
        this.user_id = 0;
        this.product_id = 0;
        this.quantity = 1;
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id: number;

    @Column()
    product_id: number;

    @Column({ default: 1 })
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product!: Product;
}