import { Injectable } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';
import KafkaTopics from 'src/kafka/kafka.topics';
import SendEmailPayload from './payloads/send-email.payload';

@Injectable()
export class MailerService {

    constructor(
        private readonly kafka: KafkaService,
    ) { }

    async sendEmail(to: string, subject: string, html: string, attachments?: string[]
    ): Promise<void> {
        const payload: SendEmailPayload = {
            to: to,
            html: html,
            subject: subject
        };
        this.kafka.emit(KafkaTopics.sendEmail, payload);
    }

}
