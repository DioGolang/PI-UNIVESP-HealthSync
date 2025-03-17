import { Module } from '@nestjs/common';
import { InfluxdbClientModule } from './persistence/influxdb/influxdb.client.module';
import { MqttClientModule } from './mqtt/mqtt.client.module';

@Module({
  imports: [InfluxdbClientModule, MqttClientModule],
})
export class InfraModule {}
