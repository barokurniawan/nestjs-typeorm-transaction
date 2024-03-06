import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';
import { ValidationPipe } from '@nestjs/common';
import { microserviceConfig } from './kafka-client.config';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.MICRO_SVC_ENABLED) {
    app.connectMicroservice(microserviceConfig);
    await app.startAllMicroservices();
  }

  await app.listen(3000);
}

bootstrap();
