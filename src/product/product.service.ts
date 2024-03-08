import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { writeFile } from 'fs/promises';
import { ProductCategoryService } from 'src/product-category/product-category.service';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private productCategoryService: ProductCategoryService,
    ) { }

    findAll() {
        return this.productRepository.find();
    }

    async findOne(id: number) {
        const row = await this.productRepository.findOne({ where: { id }, relations: { productCategory: true } });
        if (!row) {
            throw new BadRequestException("Product not found");
        }

        return row;
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }

    async create(productDto: CreateProductDTO) {

        const productCategory = await this.productCategoryService.findOne(productDto.productCategoryId);
        if (!productCategory) {
            throw new BadRequestException("Product category not found");
        }

        const product = new Product();
        product.productCategory = productCategory;
        product.productName = productDto.productName;
        product.sku = productDto.sku;

        return this.productRepository.save(product);
    }

    async exportAs(targetExt: 'csv' | 'xlsx') {
        const rows = await this.findAll();
        let chunks: string[] = [];

        for (const row of rows) {
            chunks.push([
                row.id,
                row.sku,
                row.productName,
                row.isActive
            ].join(';'));
        }

        const csvContent = chunks.join("\r\n");
        const targetPath = "storage/files/products." + targetExt;
        await writeFile(targetPath, csvContent);
        return targetPath;
    }
}
