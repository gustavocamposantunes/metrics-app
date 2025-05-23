import { HttpGetClient, HttpStatusCode } from "@/data/protocols";
import { NoCategoriesFoundError } from "@/domain/errors";

import { CategoryModel } from "@/domain/models";
import { ListCategories } from "@/domain/usecases/list-categories";

export class RemoteListCategories implements ListCategories {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient
  ) {}
  async listAll(): Promise<CategoryModel[]> {
    const httpResponse = await this.httpClient.get({ url: this.url })

    switch(httpResponse.status) {
      case HttpStatusCode.notFound: throw new NoCategoriesFoundError();
      default: return httpResponse.data as CategoryModel[]
    }
  }
}