import { BadRequestException, Injectable } from '@nestjs/common';
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
}
