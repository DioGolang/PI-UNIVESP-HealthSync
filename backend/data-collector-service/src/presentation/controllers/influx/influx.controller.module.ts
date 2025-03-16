import { Module } from '@nestjs/common';
import { InfluxController } from './influx.controller';
import { InfluxServiceModule } from '../../../application/services/influx/influx.service.module';

@Module({
  imports: [InfluxServiceModule],
  controllers: [InfluxController],
})
export class InfluxControllerModule {}
