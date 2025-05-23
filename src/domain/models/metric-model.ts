type Metrics = {
  total: number;
  metrics: Array<{ date: string, total: number }>
}

type Average = {
  total: number;
  products: Array<{ product: string, quantity: number }>;
}

export type MetricsModel = {
  orders: Metrics;
  revenue: Metrics;
  average: Average;
}