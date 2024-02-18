import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({length: 12, nullable: false})
  sku: string;

  @Column()
  productName: string;

  @Column({ default: true })
  isActive: boolean;
}
