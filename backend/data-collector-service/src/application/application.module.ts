import { Module } from '@nestjs/common';
import { InfluxServiceModule } from './services/influx/influx.service.module';
import { MqttServiceModule } from './services/mqtt/mqtt.service.module';

@Module({
  imports: [InfluxServiceModule, MqttServiceModule],
  providers: [],
})
export class ApplicationModule {}
