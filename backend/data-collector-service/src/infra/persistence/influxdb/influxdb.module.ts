import { Module } from '@nestjs/common';
import { InfluxdbService } from './influxdb.service';

@Module({
  imports: [],
  providers: [InfluxdbService],
})
export class InfluxdbModule {}
