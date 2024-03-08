import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService {

  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepo: Repository<ProductCategory>,
  ) { }

  create(productCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryRepo.save(productCategoryDto);
  }

  findAll() {
    return this.productCategoryRepo.find();
  }

  findOne(id: number): Promise<ProductCategory | null> {
    return this.productCategoryRepo.findOneBy({ id });
  }

  update(id: number, productCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoryRepo.update({ id }, productCategoryDto);
  }

  remove(id: number) {
    return this.productCategoryRepo.delete({ id });
  }
}
