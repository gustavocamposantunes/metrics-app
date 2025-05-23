import { useQuery } from "@tanstack/react-query";
import { ListCategories } from "@/domain/usecases";

export const useListCategories = (listCategories: ListCategories) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await listCategories.listAll();
    },
  });
};
