
import { it, describe, vi, beforeEach, expect } from "vitest";
import axios, { AxiosError } from "axios";
import { AxiosHttpClient } from "./axios-http-client";
import { mockGetRequest } from "@/data/test";
import { mockHttpResponse } from "../test";

vi.mock("axios");

const mockedAxios = vi.mocked(axios, true);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

describe('AxiosHttpClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    beforeEach(() => {
      mockedAxios.get.mockResolvedValue(mockHttpResponse());
    });

    it("Should call axios.get with correct values", async () => {
      const { url, queryParams } = mockGetRequest();
      const sut = makeSut();

      await sut.get({ url, queryParams });

      expect(mockedAxios.get).toHaveBeenCalledWith(url, { params: queryParams });
    });

    it("Should return correct response on axios.get", async () => {
      const sut = makeSut();
      const httpResponse = await sut.get(mockGetRequest());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;
      expect(httpResponse).toEqual(axiosResponse);
    });

    it("Should return a generic error response when axios.get throws an unknown error", async () => {
      const sut = makeSut();

      const axiosError = new Error("Unexpected error");

      mockedAxios.get.mockRejectedValueOnce(axiosError);

      await expect(sut.get(mockGetRequest())).resolves.toEqual({
        status: 500,
        data: { message: "An unknown error occurred" },
      });
    });

    it("Should return the correct error response when axios.get throws a known error", async () => {
      const sut = makeSut();

      mockedAxios.isAxiosError.mockImplementation((error): error is AxiosError => {
        return Boolean(error?.isAxiosError);
      });

      const axiosError = new AxiosError("Request failed", "ERR_BAD_REQUEST");
      axiosError.isAxiosError = true;
      axiosError.response = {
        status: 404,
        statusText: "Not Found",
        data: { message: "Not Found" },
        headers: {},
        config: { headers: new axios.AxiosHeaders() },
      };

      mockedAxios.get.mockRejectedValueOnce(axiosError);

      await expect(sut.get(mockGetRequest())).resolves.toEqual({
        status: 404,
        data: { message: "Not Found" },
      });
    });
  });
});