import { Body, Controller, Get, Post } from '@nestjs/common';
import { InfluxdbService } from '../../../application/services/influx/influx.service';

@Controller('influx')
export class InfluxController {
  constructor(private readonly influxService: InfluxdbService) {}

  @Post('write')
  async writePoint(
    @Body()
    data: {
      measurement: string;
      tags: Record<string, string>;
      fields: Record<string, number | string | boolean>;
      timestamp?: Date;
    },
  ) {
    return this.influxService.writePoint(
      data.measurement,
      data.tags,
      data.fields,
      data.timestamp,
    );
  }
  @Get('query')
  async queryData() {
    return this.influxService.queryData();
  }
}
