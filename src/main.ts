import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { microserviceConfig } from './kafka-client.config';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // this part has responsibility to hide all entity fields with decorator `@Exclude()` from response
  // see user.entity.ts
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (process.env.MICRO_SVC_ENABLED) {
    app.connectMicroservice(microserviceConfig);
    await app.startAllMicroservices();
  }

  await app.listen(3000);
}

bootstrap();
