import { HttpStatusCode } from "@/data/protocols";
import { HttpGetClientSpy } from "@/data/test";
import { NoProductsFoundError } from "@/domain/errors";
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { RemoteListProducts } from "./remote-list-products";



type SutTypes = {
  sut: RemoteListProducts
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (
  url = faker.internet.url(),
): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteListProducts(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy
  };
}

describe("RemoteListProducts", () => {
  it("Should call HttpGetClient with correct URL", () => {
    const url = faker.internet.url();

    const { sut, httpGetClientSpy } = makeSut(url)

    sut.listAll();

    expect(httpGetClientSpy.url).toBe(url);
  });

  it("Should throw NoProductsFoundError if HttpGetClient returns 400", async () => {
    const { sut, httpGetClientSpy } = makeSut();
      httpGetClientSpy.response = {
        status: HttpStatusCode.notFound
      }

      const promise = sut.listAll();

      await expect(promise).rejects.toThrow(new NoProductsFoundError());
  });
})