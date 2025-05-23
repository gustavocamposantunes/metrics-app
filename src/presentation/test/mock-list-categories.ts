import { ListCategories } from "@/domain/usecases";
import { CategoryModel } from "@/domain/models";
import { mockCategoriesModel } from "@/domain/test";

export class ListCategoriesSpy implements ListCategories {
  categories = mockCategoriesModel();
  listAll(): Promise<CategoryModel[]> {
    return Promise.resolve(this.categories)
  }
}