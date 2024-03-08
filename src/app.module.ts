import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProductConsumerController } from './product-consumer/product-consumer.controller';
import { ProductConsumerModule } from './product-consumer/product-consumer.module';
import { KafkaModule } from './kafka/kafka.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { DatabaseConfig } from './lib/database';
import { EnvConfig } from './lib/environment';
import { ProductCategoryModule } from './product-category/product-category.module';

@Module({
  imports: [
    EnvConfig,
    DatabaseConfig,
    UserModule,
    ProductModule,
    ProductConsumerModule,
    KafkaModule,
    AuthModule,
    ProductCategoryModule,
  ],
  controllers: [AppController, ProductConsumerController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
