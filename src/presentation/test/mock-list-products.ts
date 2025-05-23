import { ProductModel } from "@/domain/models";
import { mockProductsModel } from "@/domain/test";
import { ListProducts } from "@/domain/usecases/list-products";

export class ListProductsSpy implements ListProducts {
  products: ProductModel[] = mockProductsModel();
  listAll(): Promise<ProductModel[]> {
    return Promise.resolve(this.products)
  }
}