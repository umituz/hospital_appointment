import { useMemo } from "react";
import { useSearch } from "@umituz/react-native-search";
import {
  HospitalFilterRepository,
  useFilterManager,
  type HospitalFilterCriteria,
} from "@/domains/filters";
import type { FilterOption } from "@/domains/filters/types";

const hospitalFilterRepository = new HospitalFilterRepository();

export function useHospitalsFilters(hospitals: any[]) {
  const { query, setQuery, debouncedQuery } = useSearch({
    debounceMs: 300,
  });

  const filterCriteria: HospitalFilterCriteria = useMemo(
    () => ({
      searchQuery: debouncedQuery,
      city: null, // Will be set by the manager
    }),
    [debouncedQuery],
  );

  const {
    filteredItems: filteredHospitals,
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    getFilterValue,
    openFilter,
    closeFilter,
    isFilterVisible,
    applyFilter,
    resetFilter,
    resetAllFilters,
    getFilterOptions,
  } = useFilterManager({
    items: hospitals,
    repository: hospitalFilterRepository,
    initialFilters: filterCriteria,
  });

  const cityOptions: FilterOption[] = useMemo(() => {
    return hospitalFilterRepository.getCityOptions(hospitals);
  }, [hospitals]);

  const filterLabels = useMemo(() => {
    const labels: string[] = [];
    const city = getFilterValue<string>("city");

    if (city) {
      labels.push(city);
    }
    return labels;
  }, [getFilterValue]);

  const selectCity = (city: string | null) => {
    applyFilter("city", city);
  };

  const clearCityFilter = () => {
    resetFilter("city");
  };

  const clearAllFiltersAction = () => {
    resetAllFilters();
    setQuery("");
  };

  const hasActiveFilter = hasActiveFilters || query.trim() !== "";

  return {
    // Data
    hospitals: filteredHospitals,
    query,
    setQuery,

    // Filter state
    selectedCity: getFilterValue<string>("city"),

    // Filter options
    cityOptions,

    // UI state
    cityFilterVisible: isFilterVisible("city"),

    // Actions
    openCityFilter: () => openFilter("city"),
    closeCityFilter: () => closeFilter("city"),

    selectCity,
    clearCityFilter,
    clearAllFilters: clearAllFiltersAction,

    // Computed
    hasActiveFilter,
    filterLabels,
  };
}
