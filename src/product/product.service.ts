import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { writeFile } from 'fs/promises';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    findAll() {
        return this.productRepository.find();
    }

    async findOne(id: number) {
        const row = await this.productRepository.findOneBy({ id });
        if (!row) {
            throw new BadRequestException("Product not found");
        }

        return row;
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }

    create(productDto: CreateProductDTO) {
        return this.productRepository.save(productDto);
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
