import { ConsumerRunConfig, ConsumerSubscribeTopic } from 'kafkajs';

export interface ConsumerService {
  consume(
    topic: ConsumerSubscribeTopic,
    groupId: string,
    config: ConsumerRunConfig,
  );
}
