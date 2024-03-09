import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  providers: [MailerService],
  exports: [MailerService],
  imports: [
    KafkaModule,
  ],
  controllers: [MailerController]
})
export class MailerModule { }
