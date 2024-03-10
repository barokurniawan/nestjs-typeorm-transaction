
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contract } from "./contract.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class ContractDetail {

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Contract)
    contract: Contract;

    @ManyToOne(() => Product)
    product: Product;

    @Column({ default: 0 })
    amount: number;
}
