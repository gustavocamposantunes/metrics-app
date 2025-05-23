import { useLoadMetrics, useListCategories, useListProducts } from "@/presentation/hooks";
import { ListCategories, ListProducts, LoadMetrics } from "@/domain/usecases";
import { formatCurrency } from "@/presentation/utils";
import { FilterAccordion, ShowFallBack } from "@/presentation/components/organisms"
import React, { useState } from "react";
import { CustomCard } from "@/presentation/components/molecules";
import { Alert, AlertTitle } from "@/presentation/components/ui/alert";
import { 
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent 
} from "@/presentation/components/ui/chart";
import { SelectItem } from "@/presentation/components/ui/select";
import { Skeleton } from "@/presentation/components/ui/skeleton";

import { 
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis 
} from "recharts";
import { DateRange } from "react-day-picker";

type MetricsPageProps = {
  loadMetrics: LoadMetrics;
  listCategories: ListCategories;
  listProducts: ListProducts;
};
 
const chartConfigOrders = {
  total: {
    label: "total",
    color: "#2563eb",
  },
} satisfies ChartConfig

const chartConfigRevenue = {
  total: {
    label: "total",
    color: "#226677",
  },
} satisfies ChartConfig

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

const getColor = (index: number) => COLORS[index % COLORS.length];

export const MetricsPage: React.FC<MetricsPageProps> = ({ 
  loadMetrics, 
  listCategories,
  listProducts 
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedProduct, setSelectProduct] = useState<string | undefined>();

  const metrics = useLoadMetrics(
    loadMetrics, 
    { 
      categoryId: selectedCategory,
      productId: selectedProduct,
      startDate: date?.from,
      endDate: date?.to 
    }
  );

  const categories = useListCategories(listCategories);

  const products = useListProducts(listProducts);

  function search(formData: FormData) {
    const startDate = formData.get("daterange-start");
    const endDate = formData.get("daterange-end");
    const categorySelect = formData.get("category");
    const productSelect = formData.get("product");

    const parseDateFromFormData = (date: FormDataEntryValue | null): Date | undefined => date ? new Date(String(date)) : undefined;

    setDate({
      from: parseDateFromFormData(startDate),
      to: parseDateFromFormData(endDate)
    });
    setSelectedCategory(categorySelect?.toString());
    setSelectProduct(productSelect?.toString());
  }

  return (
    <main className="p-8">
      <section aria-label="search filters">
        <FilterAccordion 
          search={search}
          selectProducts={
            products.data?.map((item) => (
              <SelectItem id={item.id} data-testid={item.name} className="cursor-pointer" key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))
          }
          selectCategory={
            categories.data?.map((item) => (
              <SelectItem id={item.id} data-testid={item.name} className="cursor-pointer" key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))
          }
        />
      </section>
      <section aria-label="metrics content" className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {metrics.error ? 
          <Alert className="text-center uppercase col-span-3" data-testid="error-alert" variant="destructive">
            <AlertTitle data-testid="error-title">{metrics.error?.message}</AlertTitle>
          </Alert>
        : null}
        <ShowFallBack
          isLoading={metrics.isLoading}
          fallback={
            <>
              <Skeleton className="h-[300px]" data-testid="fallback-skeleton" />
              <Skeleton className="h-[300px]" data-testid="fallback-skeleton" />
              <Skeleton className="h-[300px]" data-testid="fallback-skeleton" />
            </>
          }
        >
          <CustomCard title="Total Orders">
            <h1 className="text-xl" data-testid="total-orders">{metrics.data?.orders.total}</h1>            
            <ChartContainer data-testid="total-orders-chart" config={chartConfigOrders} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={metrics.data?.orders.metrics}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar 
                  dataKey="total" 
                  fill="var(--color-total)" 
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CustomCard>
          <CustomCard title="Total Revenue">
            <h1 className="text-xl" data-testid="total-revenue">{formatCurrency(metrics.data?.revenue.total)}</h1>
            <ChartContainer data-testid="total-revenue-chart" config={chartConfigRevenue} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={metrics.data?.revenue.metrics}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip 
                  data-testid="total-revenue-tooltip"
                  formatter={value => formatCurrency(Number(value))}
                  content={<ChartTooltipContent />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar 
                  dataKey="total" 
                  fill="var(--color-total)" 
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CustomCard>
          <CustomCard title="Average Value">
            <h1 className="text-xl" data-testid="average-value">{formatCurrency(metrics.data?.average.total)}</h1>
            <ChartContainer
              data-testid="quantity-products-chart"
              config={chartConfigOrders}
              className="min-h-[300px] w-full flex justify-center items-center"
            >
              <PieChart width={300} height={300}>
                <Pie
                  data={metrics.data?.average.products}
                  dataKey="quantity"
                  nameKey="product"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="var(--color-total)"
                  label
                >
                  {metrics.data?.average.products.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(index)} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CustomCard>
        </ShowFallBack>
      </section>
    </main>
  );
};
