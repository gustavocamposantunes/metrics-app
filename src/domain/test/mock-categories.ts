import { CategoryModel } from "@/domain/models";
import { faker } from "@faker-js/faker";

export const mockCategoriesModel = (): CategoryModel[] => {
  const uniqueDepartments = new Set<string>();

  while (uniqueDepartments.size < 3) {
    uniqueDepartments.add(faker.commerce.department());
  }

  return Array.from(uniqueDepartments).map((name) => ({
    id: faker.string.uuid(),
    name,
  }));
};
