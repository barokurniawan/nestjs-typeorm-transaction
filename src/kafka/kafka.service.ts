import { Injectable } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { microserviceConfig } from 'src/kafka-client.config';

@Injectable()
export class KafkaService {
    @Client(microserviceConfig) 
    private client: ClientKafka;

    getClient() {
        return this.client;
    }
}
