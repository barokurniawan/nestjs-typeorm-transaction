import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    categoryName: string;

    @Column({ default: true })
    isActive: boolean;
}
