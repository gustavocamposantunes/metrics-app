import { beforeEach, describe, expect, it, vi } from "vitest";
import { 
  cleanup,
  fireEvent,
  ListCategoriesSpy,
  ListProductsSpy,
  render,
  screen
} from "@/presentation/test";
import { MetricsPage } from "./MetricsPage";

import { InvalidParamsError } from "@/domain/errors";
import { LoadMetricsSpy } from "@/presentation/test";
import { formatCurrency } from "@/presentation/utils";
import { ReactNode } from "react";

vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts');
  return {
    ...actual,
    BarChart: ({ children }: { children: ReactNode }) => <div data-testid="mocked-barchart">{children}</div>,
    PieChart: ({ children }: { children: ReactNode }) => <div data-testid="mocked-piechart">{children}</div>,
    Pie: ({ children }: { children: ReactNode }) => <div data-testid="mocked-pie">{children}</div>,
    Cell: () => <div data-testid="mocked-cell" />,
    Tooltip: () => <div data-testid="mocked-tooltip" />,
    CartesianGrid: () => <div data-testid="mocked-grid" />,
    XAxis: () => <div data-testid="mocked-xaxis" />,
    Bar: () => <div data-testid="mocked-bar" />,
    Legend: () => <div data-testid="mocked-legend" />,
  };
});

vi.mock('@/presentation/components/ui/chart', () => ({
  ChartContainer: ({ children }: { children: ReactNode }) => <div data-testid="mocked-chart-container">{children}</div>,
  ChartTooltip: ({ children }: { children: ReactNode }) => <div data-testid="mocked-tooltip-container">{children}</div>,
  ChartTooltipContent: ({ children }: { children: ReactNode }) => <div data-testid="mocked-tooltip-content">{children}</div>,
  ChartLegend: ({ children }: { children: ReactNode }) => <div data-testid="mocked-legend">{children}</div>,
  ChartLegendContent: ({ children }: { children: ReactNode }) => <div data-testid="mocked-legend-content">{children}</div>,
}));

type SutTypes = {
  loadMetricsSpy: LoadMetricsSpy
  listCategoriesSpy: ListCategoriesSpy
  listProductsSpy: ListProductsSpy
}

const makeSut = () : SutTypes => {
  const loadMetricsSpy = new LoadMetricsSpy();
  const listCategoriesSpy = new ListCategoriesSpy();
  const listProductsSpy = new ListProductsSpy();
  
  render(
    <MetricsPage
      loadMetrics={loadMetricsSpy}
      listCategories={listCategoriesSpy}
      listProducts={listProductsSpy}
    />
  );

  return {
    loadMetricsSpy,
    listCategoriesSpy,
    listProductsSpy
  }
}

describe("MetricsPage", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("Metrics", () => {
    it("Should present a fallback Skeleton while cards are not loaded", async () => {
      makeSut();

      const fallbackSkeleton = await screen.findAllByTestId("fallback-skeleton");

      expect(fallbackSkeleton.length).toBe(3);
    });

    it("Should call LoadMetrics only once", async () => {
      const { loadMetricsSpy } = makeSut();

      expect(loadMetricsSpy.callsCount).toBe(1);
    });
  
    it("Should present an error Alert if LoadMetrics fails", async () => {
      const loadMetricsSpy = new LoadMetricsSpy();
      const listCategoriesSpy = new ListCategoriesSpy();
      const listProductsSpy = new ListProductsSpy();

      const error = new InvalidParamsError();
      vi.spyOn(loadMetricsSpy, "loadAll").mockRejectedValueOnce(error);
    
      render(
        <MetricsPage 
          listProducts={listProductsSpy}
          listCategories={listCategoriesSpy}
          loadMetrics={loadMetricsSpy}
        />
      );
      
      const errorWrap = await screen.findByTestId("error-alert");
      const errorTitle = screen.getByTestId("error-title");

      expect(errorWrap).toBeTruthy();
      expect(errorTitle.textContent).toBe(error.message);
    });

    it("Should present total orders metric card on success", async () => {
      const { loadMetricsSpy } = makeSut();
      const { metrics: { orders } } = loadMetricsSpy;
  
      const totalOrdersCardLabel = await screen.findByText("Total Orders");
      const totalOrdersCardText = screen.getByTestId("total-orders");
      expect(totalOrdersCardLabel).toBeTruthy();
      expect(totalOrdersCardText.textContent).toBe(orders.total.toString());
    });

    it("Should present total revenue metric card on success", async () => {
      const { loadMetricsSpy } = makeSut();
      const { metrics: { revenue } } = loadMetricsSpy;

      const totalRevenueCardLabel = await screen.findByText("Total Revenue");
      const totalRevenueCardText = screen.getByTestId("total-revenue");
      expect(totalRevenueCardLabel).toBeTruthy();
      expect(totalRevenueCardText.textContent).toEqual(formatCurrency(revenue.total));
    });

    it("Should present average value metric card on success", async () => {
      const { loadMetricsSpy } = makeSut();
      const { metrics: { average } } = loadMetricsSpy;

      const averageValueCardLabel = await screen.findByText("Average Value");
      const averageValueCardText = screen.getByTestId("average-value");
      expect(averageValueCardLabel).toBeTruthy();
      expect(averageValueCardText.textContent).toEqual(formatCurrency(average.total));
    });
  });

  describe("Filters", () => {
    it("Should render the date range correctly", () => {
      makeSut();

      const dateRange = screen.getByTestId("date-range");

      expect(dateRange).toBeTruthy();
    });

    it("Should render the categories select correctly", async () => {
      makeSut();

      const selectValue = await screen.findByTestId("select-category-placeholder");

      expect(selectValue).toBeTruthy();
      expect(selectValue.innerHTML).toBe("Select a category");
    });

    it("Should list categories correctly", async () => {
      const { listCategoriesSpy } = makeSut();

      const selectTrigger = await screen.findByTestId("select-category-trigger");

      fireEvent.click(selectTrigger);

      await screen.findByTestId(listCategoriesSpy.categories[0].name);

      listCategoriesSpy.categories.map(item => expect(screen.getByTestId(item.name)).toBeTruthy());
    });

    it("Should render the products select correctly", async () => {
      makeSut();

      const selectValue = await screen.findByTestId("select-product-placeholder");

      expect(selectValue).toBeTruthy();
      expect(selectValue.innerHTML).toBe("Select a product");
    });

    it("Should list products correctly", async () => {
      const { listProductsSpy } = makeSut();

      const selectTrigger = await screen.findByTestId("select-product-trigger");

      fireEvent.click(selectTrigger);

      await screen.findByTestId(listProductsSpy.products[0].name);

      listProductsSpy.products.map(item => expect(screen.getByTestId(item.name)).toBeTruthy());
    });

    it("Should render the clear filters button correctly", () => {
      makeSut();

      const clearFiltersButton = screen.getByTestId("clear-filters-button");
      
      expect(clearFiltersButton).toBeTruthy();
    });

    it("Should render the filter button correctly", () => {
      makeSut();

      const filterButton = screen.getByTestId("filter-button");

      expect(filterButton).toBeTruthy();
    })
  });
});