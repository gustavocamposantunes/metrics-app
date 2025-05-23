import { LoadMetrics, LoadMetricsParams } from "@/domain/usecases";
import { MetricsModel } from "@/domain/models";
import { mockMetricsModel } from "@/domain/test";

export class LoadMetricsSpy implements LoadMetrics {
  metrics = mockMetricsModel();
  params: LoadMetricsParams | undefined;
  callsCount = 0;

  loadAll(params: LoadMetricsParams): Promise<MetricsModel> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.metrics);
  }
}