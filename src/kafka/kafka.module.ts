import { Module } from '@nestjs/common';
import { ProducerImplService } from './services/impl/producer-impl.service';
import { ConsumerImplService } from './services/impl/consumer-impl.service';

@Module({
  providers: [
    {
      provide: 'ProducerService',
      useClass: ProducerImplService,
    },
    {
      provide: 'ConsumerService',
      useClass: ConsumerImplService,
    },
  ],
  exports: [
    {
      provide: 'ProducerService',
      useClass: ProducerImplService,
    },
    {
      provide: 'ConsumerService',
      useClass: ConsumerImplService,
    },
  ],
})
export class KafkaModule {}
