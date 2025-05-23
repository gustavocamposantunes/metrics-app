import { HttpGetClient, HttpStatusCode } from "@/data/protocols";
import { NoProductsFoundError } from "@/domain/errors";
import { ProductModel } from "@/domain/models";
import { ListProducts } from "@/domain/usecases/list-products";

export class RemoteListProducts implements ListProducts{
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpGetClient
  ) {}
  async listAll() {
    const httpResponse = await this.httpClient.get({ url: this.url })

    switch(httpResponse.status) {
      case HttpStatusCode.notFound: throw new NoProductsFoundError();
      default: return httpResponse.data as ProductModel[]
    }
  }
}