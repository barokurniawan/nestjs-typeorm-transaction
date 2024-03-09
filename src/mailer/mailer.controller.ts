import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import KafkaTopics from 'src/kafka/kafka.topics';
import SendEmailPayload from './payloads/send-email.payload';
import { MailtrapClient } from 'mailtrap';

@Controller('mailer')
export class MailerController {

    @MessagePattern(KafkaTopics.sendEmail)
    async handleSendEmail(@Payload() payload: SendEmailPayload) {
        console.log("payload", payload);
        const client = new MailtrapClient({ token: process.env.MAIL_PASS });
        const sender = { name: "Mailtrap Test", email: process.env.MAIL_SENDER };

        client.send({
            from: sender,
            to: [{ email: payload.to }],
            subject: "Hello from Mailtrap!",
            text: "Welcome to Mailtrap Sending!",
        }).then(console.log).catch(console.error);
    }

}
