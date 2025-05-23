import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { vi } from "vitest";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  }
});

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

const customRender = (ui: ReactNode, options = {}) =>
  render(ui, { wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>, ...options });

export {
  render as baseRender,
  screen,
  fireEvent,
  waitFor,
  act,
  within,
  cleanup,
} from "@testing-library/react";
export { customRender as render };
