import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Contract } from "./contract.entity";

@Entity()
export class Payment {

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Contract)
    @JoinColumn()
    contract: Contract;

    @Column()
    amount: number;

    @Column()
    paymentMethod: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}