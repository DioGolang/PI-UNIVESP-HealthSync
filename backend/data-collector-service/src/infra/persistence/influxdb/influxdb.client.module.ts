import { Module } from '@nestjs/common';
import { InfluxClient } from './influxdb.client';

@Module({
  providers: [InfluxClient],
  exports: [InfluxClient],
})
export class InfluxdbClientModule {}
