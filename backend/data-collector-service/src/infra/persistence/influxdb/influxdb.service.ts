import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfluxdbService implements OnModuleInit {
  private influxDB: InfluxDB;
  private writeApi: WriteApi;
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const url = this.configService.get<string>('INFLUX_URL');
    const token = this.configService.get<string>('INFLUX_TOKEN');
    const org = this.configService.get<string>('INFLUX_ORG');
    const bucket = this.configService.get<string>('INFLUX_BUCKET');

    this.influxDB = new InfluxDB({ url, token });
    this.writeApi = this.influxDB.getWriteApi(org, bucket);
    this.writeApi.useDefaultTags({ host: 'host1' });
  }

  async writePoint(
    measurement: string,
    tags: Record<string, string>,
    fields: Record<string, number | string | boolean>,
    timestamp?: Date,
  ) {
    const point = new Point(measurement)
      .tag('host', 'server1')
      .timestamp(timestamp ?? new Date());

    Object.entries(tags).forEach(([key, value]) => point.tag(key, value));
    Object.entries(fields).forEach(([key, value]) =>
      point.floatField(key, value),
    );

    this.writeApi.writePoint(point);
    await this.writeApi.flush();
  }
}
