// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("users")
export class User {
    constructor() {
        this.email = "";
        this.password_hash = "";
        this.first_name = "";
        this.last_name = "";
        this.address = "";
        this.phone = "";
        this.created_at = new Date();
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string;

    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    phone: string;

    @CreateDateColumn()
    created_at: Date;
}