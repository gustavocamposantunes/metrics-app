import { describe, expect, it } from "vitest";
import { formatCurrency } from "./format";

describe("formatCurrency", () => {
  it("should format a number as currency", () => {
    const result = formatCurrency(1234.56);
    expect(result).toBe("R$ 1.234,56");
  });

  it("should return 'N/A' for undefined input", () => {
    const result = formatCurrency(undefined);
    expect(result).toBe("N/A");
  });
})