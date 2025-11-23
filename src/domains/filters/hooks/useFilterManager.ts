import { useMemo } from "react";
import type {
  FilterCriteria,
  FilterRepository,
  FilterOption,
  FilterState,
} from "../types";
import { useFilterState } from "./useFilterState";
import { useFilterUI } from "./useFilterUI";

export interface UseFilterManagerConfig<T, F extends FilterCriteria> {
  items: T[];
  repository: FilterRepository<T, F>;
  initialFilters?: Partial<F>;
}

export function useFilterManager<T, F extends FilterCriteria>({
  items,
  repository,
  initialFilters = {},
}: UseFilterManagerConfig<T, F>) {
  const {
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    getFilterValue,
  } = useFilterState(initialFilters as any);

  const {
    openFilter,
    closeFilter,
    toggleFilter,
    closeAllFilters,
    isFilterVisible,
  } = useFilterUI();

  const filteredItems = useMemo(() => {
    return repository.filter(items, filters as F);
  }, [items, repository, filters]);

  const getFilterOptions = (filterKey: keyof F): FilterOption[] => {
    return repository.getFilterOptions(items, filterKey);
  };

  const applyFilter = (filterKey: string, value: FilterState[string]) => {
    setFilter(filterKey, value);
    closeFilter(filterKey);
  };

  const resetFilter = (filterKey: string) => {
    clearFilter(filterKey);
    closeFilter(filterKey);
  };

  const resetAllFilters = () => {
    clearAllFilters();
    closeAllFilters();
  };

  return {
    // Data
    filteredItems,
    filters: filters as F,

    // State management
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    getFilterValue,

    // UI management
    openFilter,
    closeFilter,
    toggleFilter,
    closeAllFilters,
    isFilterVisible,

    // Actions
    applyFilter,
    resetFilter,
    resetAllFilters,
    getFilterOptions,
  };
}
