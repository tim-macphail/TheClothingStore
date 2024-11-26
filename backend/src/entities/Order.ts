import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("orders")
export class Order {
    constructor() {
        this.user_id = 0;
        this.total_amount = 0;
        this.status = "pending";
        this.shipping_address = "";
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_amount: number;

    @Column({ default: "pending" })
    status: string;

    @Column()
    shipping_address: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;
}