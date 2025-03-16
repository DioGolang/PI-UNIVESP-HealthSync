import { Test, TestingModule } from '@nestjs/testing';
import { InfluxdbClient } from './influxdb.client';

describe('InfluxdbService', () => {
  let service: InfluxdbClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfluxdbClient],
    }).compile();

    service = module.get<InfluxdbClient>(InfluxdbClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
