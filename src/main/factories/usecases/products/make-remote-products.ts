import { makeApiUrl, makeAxiosHttpClient } from "../../http";
import { ListProducts } from "@/domain/usecases";
import { RemoteListProducts } from "@/data/usecases/list-products";

export const makeRemoteProducts = (): ListProducts => new RemoteListProducts(makeApiUrl("/products"), makeAxiosHttpClient());