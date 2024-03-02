import { Body, Controller, Delete, Get, Param, Post, Res, StreamableFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { Transactional } from 'typeorm-transactional';
import { CreateProductDTO } from './dtos/create-product.dto';
import { KafkaService } from 'src/kafka/kafka.service';
import KafkaTopics from 'src/kafka/kafka.topics';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService,
        private readonly kafka: KafkaService,
    ) { }

    @Get()
    getProducts() {
        return this.productService.findAll();
    }

    @Post("/export")
    exportProduct() {
        this.kafka.emit(KafkaTopics.exportProduct, { target: 'csv' });

        return { ok: true };
    }

    @Get("/export")
    async exportedProduct(@Res({ passthrough: true }) res: Response) {
        const file = createReadStream('./storage/files/products.csv');
        res.set({
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="products.csv"'
        });

        return new StreamableFile(file);
    }

    @Get(':id')
    getProduct(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Transactional()
    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productService.remove(id);
    }

    @Transactional()
    @Post()
    async createProduct(@Body('product') createUserDto: CreateProductDTO) {
        const product = await this.productService.create(createUserDto);
        return product;
    }
}
