import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { KafkaModule } from 'src/kafka/kafka.module';
import { ProductCategoryModule } from 'src/product-category/product-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), KafkaModule, ProductCategoryModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule { }
