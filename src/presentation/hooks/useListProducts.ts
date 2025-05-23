import { useQuery } from "@tanstack/react-query";
import { ListProducts } from "@/domain/usecases";

export const useListProducts = (listProducts: ListProducts) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await listProducts.listAll();
    },
  });
};
