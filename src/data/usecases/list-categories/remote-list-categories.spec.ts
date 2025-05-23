import { HttpStatusCode } from "@/data/protocols";
import { HttpGetClientSpy } from "@/data/test";
import { NoCategoriesFoundError } from "@/domain/errors";
import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { RemoteListCategories } from "./remote-list-categories";

type SutTypes = {
  sut: RemoteListCategories
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (
  url = faker.internet.url(),
): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteListCategories(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy
  };
};

describe("RemoteListCategories", () => {
  it("Should call HttpGetClient with correct URL", () => {
    const url = faker.internet.url();

    const { sut, httpGetClientSpy } = makeSut(url);
    sut.listAll()
    expect(httpGetClientSpy.url).toBe(url);
  });

  it("Should throw NoCategoriesFoundError if HttpGetClient returns 400", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      status: HttpStatusCode.notFound
    }

    const promise = sut.listAll();

    await expect(promise).rejects.toThrow(new NoCategoriesFoundError());
  });
})