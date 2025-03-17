import { Test, TestingModule } from '@nestjs/testing';
import { MqttClient } from './mqtt.client';

describe('MqttService', () => {
  let service: MqttClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqttClient],
    }).compile();

    service = module.get<MqttClient>(MqttClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
