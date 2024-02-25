import { Test, TestingModule } from '@nestjs/testing';
import { ProductConsumerController } from './product-consumer.controller';

describe('ProductConsumerController', () => {
  let controller: ProductConsumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductConsumerController],
    }).compile();

    controller = module.get<ProductConsumerController>(ProductConsumerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
