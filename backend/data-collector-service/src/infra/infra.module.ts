import { Module } from '@nestjs/common';
import { InfluxdbClientModule } from './persistence/influxdb/influxdb.client.module';

@Module({
  imports: [InfluxdbClientModule],
})
export class InfraModule {}
