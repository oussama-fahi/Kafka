import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { ProducerService } from '../ProducerService';
import { kafka } from 'src/common/constants/configs';

@Injectable()
export class ProducerImplService
  implements OnModuleInit, OnApplicationShutdown, ProducerService
{
  private readonly kafka = new Kafka({
    brokers: kafka.brokers,
  });
  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
