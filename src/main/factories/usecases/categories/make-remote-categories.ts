import { RemoteListCategories } from "@/data/usecases/list-categories";
import { makeApiUrl, makeAxiosHttpClient } from "../../http";
import { ListCategories } from "@/domain/usecases";

export const makeRemoteCategories = (): ListCategories => new RemoteListCategories(makeApiUrl("/categories"), makeAxiosHttpClient());