import { MetricsModel } from "../models";

export type LoadMetricsParams = {
  startDate?: Date;
  endDate?: Date;
  categoryId?: string;
  productId?: string;
}

export interface LoadMetrics {
  loadAll(params: LoadMetricsParams): Promise<MetricsModel>
}