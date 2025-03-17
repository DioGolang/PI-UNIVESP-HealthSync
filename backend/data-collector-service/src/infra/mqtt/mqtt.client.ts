import { Injectable } from '@nestjs/common';
import { InfluxdbService } from '../../application/services/influx/influx.service';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';

@Injectable()
export class MqttClient {
  constructor(private readonly influxdbService: InfluxdbService) {}

  @MessagePattern('physionet/data')
  async handleMessage(@Payload() data: any, @Ctx() context: MqttContext) {
    await this.influxdbService.writePoint(
      'vital_signs',
      { device: data.deviceId },
      { heartRate: data.heartRate, ecg: data.ecg },
    );
  }
}
