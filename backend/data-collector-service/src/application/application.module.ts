import { Module } from '@nestjs/common';
import { InfluxServiceModule } from './services/influx/influx.service.module';

@Module({
  imports: [InfluxServiceModule],
})
export class ApplicationModule {}
