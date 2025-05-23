import { HttpGetClient, HttpStatusCode } from "@/data/protocols";
import { InvalidParamsError } from "@/domain/errors";
import { MetricsModel } from "@/domain/models";
import { LoadMetrics, LoadMetricsParams } from "@/domain/usecases";

export class RemoteLoadMetrics implements LoadMetrics {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient
  ) {}

  async loadAll(params: LoadMetricsParams): Promise<MetricsModel> {
    const httpResponse = await this.httpClient.get({
      url: this.url,
      queryParams: {
        startDate: params.startDate?.toISOString(),
        endDate: params.endDate?.toISOString(),
        categoryId: params.categoryId,
        productId: params.productId
      }
    });

    switch (httpResponse.status) {
      case HttpStatusCode.badRequest: throw new InvalidParamsError();
      default: return httpResponse.data as MetricsModel;
    }
  }
}