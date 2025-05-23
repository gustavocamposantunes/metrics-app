import { CategoryModel } from "../models";

export interface ListCategories {
  listAll(): Promise<CategoryModel[]>
}