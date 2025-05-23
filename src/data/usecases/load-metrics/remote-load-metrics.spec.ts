import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { RemoteLoadMetrics } from "./remote-load-metrics";
import { HttpGetClientSpy } from "@/data/test";
import { HttpStatusCode } from "@/data/protocols";
import { InvalidParamsError } from "@/domain/errors";

type SutTypes = {
  sut: RemoteLoadMetrics
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (
  url = faker.internet.url(),
): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteLoadMetrics(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy
  };
};

describe("RemoteLoadMetrics", () => {
  const queryParams = {
    startDate: faker.date.recent(),
    endDate: faker.date.recent(),
    categoryId: faker.string.uuid(),
    productId: faker.string.uuid()
  }

  it("Should call HttpGetClient with correct URL", () => {
    const url = faker.internet.url();

    const { sut, httpGetClientSpy } = makeSut(url);
    sut.loadAll(queryParams)
    expect(httpGetClientSpy.url).toBe(url);
  });

  it("Should call HttpGetClient with correct queryParams", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    await sut.loadAll(queryParams);

    expect(httpGetClientSpy.queryParams).toEqual({
      ...queryParams,
      startDate: queryParams.startDate.toISOString(),
      endDate: queryParams.endDate.toISOString()
    });
  });

  it("Should throw InvalidParamsError if HttpGetClient returns 400", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      status: HttpStatusCode.badRequest
    }

    const promise = sut.loadAll(queryParams);

    await expect(promise).rejects.toThrow(new InvalidParamsError());
  });
})