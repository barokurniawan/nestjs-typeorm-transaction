import { ProductCategory } from 'src/product-category/entities/product-category.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 12, nullable: false })
  sku: string;

  @Column()
  productName: string;

  @ManyToOne(() => ProductCategory)
  @JoinColumn()
  productCategory?: ProductCategory;

  @Column({ default: true })
  isActive: boolean;
}
