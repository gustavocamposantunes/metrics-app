import { ProductModel } from "../models";

export interface ListProducts {
  listAll(): Promise<ProductModel[]>
}