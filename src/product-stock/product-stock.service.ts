import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import ProductEntryType from './enums/product-entry-type';
import { ProductStock } from './entities/product-stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductStockService {

    constructor(
        @InjectRepository(ProductStock)
        private productStockRepo: Repository<ProductStock>,
        private readonly productService: ProductService,
    ) { }

    async createEntry(productId: number, stockQty: number, entryType: ProductEntryType) {
        const product = await this.productService.findOne(productId);
        const entry = new ProductStock();
        entry.stockQty = stockQty;
        entry.entryType = entryType;
        entry.product = product;

        return this.productStockRepo.save(entry);
    }

    async restock(productId: number, stockQty: number) {
        if (stockQty <= 0) {
            throw new BadRequestException("Invalid supplied stock qty");
        }

        const product = await this.productService.findOne(productId);
        const newStockQty = product.stockQty + stockQty;

        await this.createEntry(product.id, stockQty, ProductEntryType.Addition);

        return this.productService.updateStockQty(product.id, newStockQty, product.stockQty);
    }

    async deductStock(productId: number, deductQty: number = 1) {
        if (deductQty <= 0) {
            throw new BadRequestException("Invalid supplied stock qty");
        }

        const product = await this.productService.findOne(productId);
        const newStockQty = product.stockQty - deductQty;
        if (product.stockQty < deductQty || newStockQty < 0) {
            throw new BadRequestException("insufficient stock balance");
        }

        await this.createEntry(product.id, deductQty, ProductEntryType.Deduction);

        return this.productService.updateStockQty(product.id, newStockQty, product.stockQty);
    }
}
