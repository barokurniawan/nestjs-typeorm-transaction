import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { Attachment } from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {

    constructor(private readonly mailerService: NestMailerService) { }

    async sendEmail(to: string, subject: string, content: string, attachments?: Attachment[]
    ): Promise<void> {
        const info = await this.mailerService.sendMail({
            to,
            subject,
            attachments,
            html: content,
        });

        console.log("info", info);
    }

}
