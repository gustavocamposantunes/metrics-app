import { HttpGetClient, HttpGetParams, HttpResponse, HttpStatusCode } from "@/data/protocols";

export class HttpGetClientSpy implements HttpGetClient {
  url: string | undefined;
  queryParams: Record<string, string | number | boolean | undefined> | undefined;
  response: HttpResponse = {
    status: HttpStatusCode.ok
  };

  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.url = params.url;
    this.queryParams = params.queryParams
    return this.response;
  }
}