import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column({ comment: "this is a lastname of an user" })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
