import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import KafkaTopics from 'src/kafka/kafka.topics';
import { ProductService } from 'src/product/product.service';

@Controller('product-consumer')
export class ProductConsumerController {

    constructor(
        private readonly productService: ProductService,
    ) { }

    @EventPattern(KafkaTopics.exportProduct)
    exportProductToCsv(@Payload() payload: any) {
        console.log(`${KafkaTopics.exportProduct}...`, payload);

        return this.productService.exportAs('csv');
    }
}
