import { faker } from "@faker-js/faker";
import { MetricsModel } from "../models";

export const mockMetricsModel = (): MetricsModel => {
  const orders = { 
    total: 200,
    metrics: [
      {
        date: faker.date.recent().toISOString(),
        total: 10
      },
      {
        date: faker.date.recent().toISOString(),
        total: 200
      },
      {
        date: faker.date.recent().toISOString(),
        total: 300
      },
    ]
  };
  const revenue = { 
    total: 4500,
    metrics: orders.metrics
  };
  const average = {
    total: Number((revenue.total / orders.total).toFixed(2)),
    products: [
      {
        product: faker.commerce.productName(),
        quantity: faker.number.int()
      },
      {
        product: faker.commerce.productName(),
        quantity: faker.number.int()
      },
      {
        product: faker.commerce.productName(),
        quantity: faker.number.int()
      }
    ]
  };

  return {
    orders,
    revenue,
    average
  };
};
