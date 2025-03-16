import { Injectable } from '@nestjs/common';
import {
  InfluxDB,
  Point,
  QueryApi,
  WriteApi,
} from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfluxClient {
  private influxDB: InfluxDB;
  private writeApi: WriteApi;
  private queryApi: QueryApi;

  constructor(private readonly configService: ConfigService) {}
  connect() {
    this.influxDB = new InfluxDB({
      url: this.configService.get('INFLUX_URL'),
      token: this.configService.get('INFLUX_TOKEN'),
    });

    this.writeApi = this.influxDB.getWriteApi(
      this.configService.get('INFLUX_ORG'),
      this.configService.get('INFLUX_BUCKET'),
    );

    this.queryApi = this.influxDB.getQueryApi(
      this.configService.get('INFLUX_ORG'),
    );

    this.writeApi.useDefaultTags({ host: 'host1' });
  }

  async writePoint(
    measurement: string,
    tags: Record<string, string>,
    fields: Record<string, number | string | boolean>,
    timestamp?: Date,
  ) {
    const point = new Point(measurement).timestamp(timestamp ?? new Date());

    Object.entries(tags).forEach(([key, value]) => point.tag(key, value));
    Object.entries(fields).forEach(([key, value]) =>
      point.floatField(key, value),
    );

    this.writeApi.writePoint(point);
    await this.writeApi.flush();
  }

  async queryData() {
    const query = `from(bucket: "${this.configService.get('INFLUX_BUCKET')}") |> range(start: -1h)`;
    return this.queryApi.collectRows(query);
  }
}
