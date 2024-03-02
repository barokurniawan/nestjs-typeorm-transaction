import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Transactional } from 'typeorm-transactional';
import { CreateProductDTO } from './dtos/create-product.dto';
import { KafkaService } from 'src/kafka/kafka.service';
import KafkaTopics from 'src/kafka/kafka.topics';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService,
        private readonly kafka: KafkaService,
    ) { }

    @Get()
    getProducts() {
        this.kafka.emit(KafkaTopics.exportProduct, { target: 'csv' });
        return this.productService.findAll();
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
