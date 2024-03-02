import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import KafkaTopics from 'src/kafka/kafka.topics';
import { ProductService } from 'src/product/product.service';

@Controller('product-consumer')
export class ProductConsumerController {

    constructor(
        private readonly productService: ProductService,
    ) { }

    @MessagePattern(KafkaTopics.exportProduct)
    exportProductToCsv(@Payload() payload: any) {
        console.log(`${KafkaTopics.exportProduct}...1`, payload);

        return this.productService.exportAs('csv');
    }
}
