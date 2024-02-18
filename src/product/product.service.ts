import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    findAll() {
        return this.productRepository.find();
    }

    create(productDto: CreateProductDTO) {
        return this.productRepository.save(productDto);
    }
}
