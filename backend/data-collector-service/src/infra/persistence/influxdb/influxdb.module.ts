import { Module } from '@nestjs/common';
import { InfluxdbService } from './influxdb.service';

@Module({
  providers: [InfluxdbService],
})
export class InfluxdbModule {}
