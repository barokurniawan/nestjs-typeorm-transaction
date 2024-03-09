import { Module } from '@nestjs/common';
import { ProductStockService } from './product-stock.service';
import { ProductModule } from 'src/product/product.module';
import { ProductStockController } from './product-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStock } from './entities/product-stock.entity';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([ProductStock])],
  providers: [ProductStockService],
  controllers: [ProductStockController]
})
export class ProductStockModule { }
