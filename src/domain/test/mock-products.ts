import { ProductModel } from "@/domain/models";
import { faker } from "@faker-js/faker";

export const mockProductsModel = (): ProductModel[] => {
  const uniqueDepartments = new Set<string>();

  while (uniqueDepartments.size < 3) {
    uniqueDepartments.add(faker.commerce.product());
  }

  return Array.from(uniqueDepartments).map((name) => ({
    id: faker.string.uuid(),
    name,
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    categoryIds: [faker.string.uuid(), faker.string.uuid()]
  }));
};
