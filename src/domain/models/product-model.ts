export type ProductModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryIds: Array<string>;
}