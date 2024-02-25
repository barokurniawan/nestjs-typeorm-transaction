import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductService } from 'src/product/product.service';

@Controller('product-consumer')
export class ProductConsumerController {

    constructor(
        private readonly productService: ProductService,
    ) { }

    @EventPattern("export-product")
    exportProductToCsv(@Payload() payload: any) {
        console.log("export-product...", payload);

        return this.productService.exportAs('csv');
    }
}
