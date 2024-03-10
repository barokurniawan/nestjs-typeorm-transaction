import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ContractDetail } from "./contract-detail.entity";
import { Payment } from "./payment.entity";

@Entity()
export class Contract {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    orderId: string;

    @Column({ default: 0 })
    amount: number;

    @OneToMany(type => ContractDetail, (detail) => detail.contract)
    contractDetails: ContractDetail[];

    @OneToMany(type => Payment, (payment) => payment.contract)
    payments: Payment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
