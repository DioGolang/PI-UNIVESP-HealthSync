import { Injectable, OnModuleInit } from '@nestjs/common';
import { InfluxPort } from '../../../ports/influx.port';
import { InfluxClient } from '../../../infra/persistence/influxdb/influxdb.client';

@Injectable()
export class InfluxdbService implements InfluxPort, OnModuleInit {
  constructor(private readonly influxClient: InfluxClient) {}

  onModuleInit() {
    this.influxClient.connect();
  }

  async writePoint(
    measurement: string,
    tags: Record<string, string>,
    fields: Record<string, number | string | boolean>,
    timestamp?: Date,
  ) {
    await this.influxClient.writePoint(measurement, tags, fields, timestamp);
  }

  async queryData() {
    return this.influxClient.queryData();
  }
}
