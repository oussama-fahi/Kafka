import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
  Kafka,
} from 'kafkajs';
import { ConsumerService } from '../consumer.service';
import { kafka } from 'src/common/constants/configs';

@Injectable()
export class ConsumerImplService
  implements OnApplicationShutdown, ConsumerService
{
  private readonly kafka = new Kafka({
    brokers: kafka.brokers,
  });
  private readonly consumers: Consumer[] = [];

  async consume(
    topic: ConsumerSubscribeTopic,
    groupId: string,
    config: ConsumerRunConfig,
  ) {
    const consumer = this.kafka.consumer({ groupId: this.groupId() });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  private groupId() {
    const uuid = new Array(36);
    for (let i = 0; i < 36; i++) {
      uuid[i] = Math.floor(Math.random() * 16);
    }
    uuid[14] = 4;
    uuid[19] = uuid[19] &= ~(1 << 2);
    uuid[19] = uuid[19] |= 1 << 3;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    return `qalqul.group.id.${uuid.map((x) => x.toString(16)).join('')}`;
  }
}
