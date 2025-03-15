import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfluxdbService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private influxDB: InfluxDB,
    private writeApi: WriteApi,
  ) {}

  onModuleInit() {
    this.influxDB = new InfluxDB({
      url: this.configService.get('INFLUXDB_URL'),
      token: this.configService.get('INFLUXDB_TOKEN'),
    });

    this.writeApi = this.influxDB.getWriteApi(
      this.configService.get('INFLUXDB_ORG'),
      this.configService.get('INFLUXDB_BUCKET'),
    );

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
