import { Module } from '@nestjs/common';
import { InfluxControllerModule } from './controllers/influx/influx.controller.module';

@Module({
  imports: [InfluxControllerModule],
})
export class PresentationModule {}
