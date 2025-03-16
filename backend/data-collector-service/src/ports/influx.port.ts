export interface InfluxPort {
  writePoint(
    measurement: string,
    tags: Record<string, string>,
    fields: Record<string, number | string | boolean>,
    timestamp?: Date,
  ): Promise<void>;

  queryData(): Promise<any>;
}
