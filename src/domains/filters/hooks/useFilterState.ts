import { useState, useCallback } from "react";
import type { FilterState } from "../types";

export function useFilterState(initialState: FilterState = {}) {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const setFilter = useCallback((key: string, value: FilterState[string]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const clearFilter = useCallback((key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasActiveFilters = Object.keys(filters).length > 0;

  const getFilterValue = useCallback(
    <T>(key: string): T | undefined => {
      return filters[key] as T;
    },
    [filters],
  );

  return {
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    getFilterValue,
  };
}
