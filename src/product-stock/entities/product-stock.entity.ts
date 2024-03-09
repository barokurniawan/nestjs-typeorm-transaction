import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ProductEntryType from "../enums/product-entry-type";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class ProductStock {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    entryType: ProductEntryType;

    @Column()
    stockQty: number

    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
