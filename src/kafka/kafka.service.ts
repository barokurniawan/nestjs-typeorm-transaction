import { Injectable } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { microserviceConfig } from 'src/kafka-client.config';

@Injectable()
export class KafkaService {
    @Client(microserviceConfig) 
    private client: ClientKafka;

    getClient() {
        return this.client;
    }

    emit<T1, T2>(pattern: any, data: T2): Observable<T1> {
        return this.getClient().emit<T1, T2>(pattern, data);
    }
}
