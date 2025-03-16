import { Module } from '@nestjs/common';
import { InfluxdbService } from './influx.service';
import { InfluxdbClientModule } from '../../../infra/persistence/influxdb/influxdb.client.module';

@Module({
  providers: [InfluxdbService],
  imports: [InfluxdbClientModule],
  exports: [InfluxdbService],
})
export class InfluxServiceModule {}
