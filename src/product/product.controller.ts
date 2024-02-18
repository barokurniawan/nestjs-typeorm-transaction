import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Transactional } from 'typeorm-transactional';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Get()
    getProducts () {
        return this.productService.findAll();
    }

    @Transactional()
    @Post()
    async createProduct (@Body('product') createUserDto: CreateProductDTO) {
        const product = await this.productService.create(createUserDto);
        return product;
    }
}
