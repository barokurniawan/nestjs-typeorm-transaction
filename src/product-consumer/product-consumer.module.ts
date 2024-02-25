import { Module } from '@nestjs/common';
import { ProductConsumerController } from './product-consumer.controller';
import { ProductModule } from 'src/product/product.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [ProductModule, KafkaModule],
  controllers: [ProductConsumerController],
})
export class ProductConsumerModule {}
