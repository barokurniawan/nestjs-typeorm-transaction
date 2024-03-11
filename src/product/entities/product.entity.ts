import { ProductCategory } from 'src/product-category/entities/product-category.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 12, nullable: false })
  sku: string;

  @Column()
  productName: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ default: 0 })
  stockQty: number;

  @ManyToOne(() => ProductCategory)
  @JoinColumn()
  productCategory?: ProductCategory;

  @ManyToOne(() => User)
  @JoinColumn()
  user?: User;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
