import { Module } from '@nestjs/common';
import { InfluxdbModule } from './persistence/influxdb/influxdb.module';

@Module({
  imports: [InfluxdbModule],
})
export class InfraModule {}
