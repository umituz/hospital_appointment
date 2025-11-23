import { useState, useCallback } from "react";

export interface FilterUIState {
  visibleFilters: Record<string, boolean>;
}

export function useFilterUI(
  initialState: FilterUIState = { visibleFilters: {} },
) {
  const [uiState, setUIState] = useState<FilterUIState>(initialState);

  const openFilter = useCallback((filterId: string) => {
    setUIState((prev) => ({
      ...prev,
      visibleFilters: {
        ...prev.visibleFilters,
        [filterId]: true,
      },
    }));
  }, []);

  const closeFilter = useCallback((filterId: string) => {
    setUIState((prev) => ({
      ...prev,
      visibleFilters: {
        ...prev.visibleFilters,
        [filterId]: false,
      },
    }));
  }, []);

  const toggleFilter = useCallback((filterId: string) => {
    setUIState((prev) => ({
      ...prev,
      visibleFilters: {
        ...prev.visibleFilters,
        [filterId]: !prev.visibleFilters[filterId],
      },
    }));
  }, []);

  const closeAllFilters = useCallback(() => {
    setUIState((prev) => ({
      ...prev,
      visibleFilters: Object.keys(prev.visibleFilters).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {},
      ),
    }));
  }, []);

  const isFilterVisible = useCallback(
    (filterId: string): boolean => {
      return uiState.visibleFilters[filterId] || false;
    },
    [uiState.visibleFilters],
  );

  return {
    openFilter,
    closeFilter,
    toggleFilter,
    closeAllFilters,
    isFilterVisible,
  };
}
