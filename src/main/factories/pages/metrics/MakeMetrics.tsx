import React from "react";

import { MetricsPage } from "@/presentation/pages/metrics/MetricsPage";
import { makeRemoteMetrics } from "../../usecases/metrics/make-remote-metrics";
import { makeRemoteCategories } from "../../usecases/categories/make-remote-categories";
import { makeRemoteProducts } from "../../usecases/products/make-remote-products";

export const MakeMetrics: React.FC = () => {
  return (
    <MetricsPage 
      loadMetrics={makeRemoteMetrics()}
      listCategories={makeRemoteCategories()}
      listProducts={makeRemoteProducts()}
    />
  );
};