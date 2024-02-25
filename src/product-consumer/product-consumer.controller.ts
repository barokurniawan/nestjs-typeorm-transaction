import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from 'src/product/product.service';

@Controller('product-consumer')
export class ProductConsumerController {

    constructor(
        private readonly productService: ProductService,
    ) { }

    @EventPattern("export-product")
    exportProductToCsv() {
        console.log("export-product...");

        return this.productService.exportAs('csv');
    }
}
