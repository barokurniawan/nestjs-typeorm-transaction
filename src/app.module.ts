import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { ProductModule } from './product/product.module';
import { ProductConsumerController } from './product-consumer/product-consumer.controller';
import { ProductConsumerModule } from './product-consumer/product-consumer.module';
import { KafkaModule } from './kafka/kafka.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '@@@udanup',
          database: 'usm_database',
          entities: ["dist/**/*.entity{.ts,.js}"],
          migrations: ["dist/migrations/*{.ts,.js}"],
          logging: true,
          synchronize: true,
          migrationsRun: false,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UserModule,
    ProductModule,
    ProductConsumerModule,
    KafkaModule,
    AuthModule,
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
