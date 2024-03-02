import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import KafkaTopics from 'src/kafka/kafka.topics';
import { ProductService } from 'src/product/product.service';
import { Transactional } from 'typeorm-transactional';

@Controller('product-consumer')
export class ProductConsumerController {

    constructor(
        private readonly productService: ProductService,
    ) { }

    @MessagePattern(KafkaTopics.exportProduct)
    @Transactional()
    exportProductToCsv(@Payload() payload: any) {
        console.log(`${KafkaTopics.exportProduct}...`, payload);

        return this.productService.exportAs('csv');
    }
}
