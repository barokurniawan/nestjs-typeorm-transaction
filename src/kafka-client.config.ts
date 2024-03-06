import { KafkaOptions, Transport } from "@nestjs/microservices";
import { Partitioners } from "kafkajs";

export const microserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:29092'],
    },
    producer: {
      createPartitioner: Partitioners.LegacyPartitioner
    }
  }
};