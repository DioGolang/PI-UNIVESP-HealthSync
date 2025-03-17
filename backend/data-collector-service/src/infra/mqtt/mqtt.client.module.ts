import { Module } from '@nestjs/common';
import { MqttClient } from './mqtt.client';
import { InfluxServiceModule } from '../../application/services/influx/influx.service.module';

@Module({
  imports: [InfluxServiceModule],
  providers: [MqttClient],
})
export class MqttClientModule {}
