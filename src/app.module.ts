import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { EnvConfig } from './lib/configs';
import { ProductCategoryModule } from './product-category/product-category.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { MailerModule } from './mailer/mailer.module';
import { ProductStockModule } from './product-stock/product-stock.module';
import { TransactionModule } from './transaction/transaction.module';

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
    MailerModule,
    ProductStockModule,
    TransactionModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}