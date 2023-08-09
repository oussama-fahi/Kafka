import { ProducerRecord } from 'kafkajs';

export interface ProducerService {
  produce(record: ProducerRecord);
}
