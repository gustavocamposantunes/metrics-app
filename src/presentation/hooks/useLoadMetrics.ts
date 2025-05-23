import { useQuery } from "@tanstack/react-query";
import { LoadMetrics, LoadMetricsParams } from "@/domain/usecases";

export const useLoadMetrics = (loadMetrics: LoadMetrics, filters: LoadMetricsParams) => {
  return useQuery({
    queryKey: ["metrics", filters],
    queryFn: async () => {
      return await loadMetrics.loadAll(filters);
    }
  });
};
