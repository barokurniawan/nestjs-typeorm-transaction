import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerModule as NestMailer } from '@nestjs-modules/mailer';

@Module({
  providers: [MailerService],
  exports: [MailerService],
  imports: [
    NestMailer.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: +process.env.MAIL_PORT,
        secure: true, // Set to true if using SSL/TLS
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@ouwteam.id>',
      },
    }),
  ]
})
export class MailerModule { }
