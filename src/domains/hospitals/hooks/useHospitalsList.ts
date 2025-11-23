import { useMemo } from "react";
import { useSearch } from "@umituz/react-native-search";
import { useListFilters } from "@umituz/react-native-filter";
import { useHospitals } from "./useHospitals";
import { useHospitalFilters } from "./useHospitalFilters";
import { useHospitalFilterOptions } from "./useHospitalFilterOptions";
import { filterHospitals, type HospitalFilters } from "../utils/filtering";

export function useHospitalsList() {
  const { hospitals, isLoading, refetch } = useHospitals();
  const { query, setQuery, debouncedQuery } = useSearch({
    debounceMs: 300,
  });

  const {
    selectedCity,
    cityFilterVisible,
    openCityFilter,
    closeCityFilter,
    selectCity,
    clearFilters: clearFilterSelections,
    hasActiveFilter: hasActiveFilterSelection,
  } = useHospitalFilters();

  const { cityOptions } = useHospitalFilterOptions(hospitals);

  const {
    handleFilterPress: handleCityFilterPress,
    handleClearFilters: handleClearCityFilters,
  } = useListFilters({
    options: cityOptions,
    defaultFilterId: "",
    singleSelect: true,
  });

  const filteredHospitals = useMemo(() => {
    const filters: HospitalFilters = {
      searchQuery: debouncedQuery,
      city: selectedCity,
    };
    return filterHospitals(hospitals, filters);
  }, [hospitals, debouncedQuery, selectedCity]);

  const handleCitySelect = (filterId: string) => {
    const city = filterId || null;
    handleCityFilterPress(filterId);
    selectCity(city);
  };

  const handleClearCity = () => {
    handleClearCityFilters();
    selectCity(null);
    closeCityFilter();
  };

  const handleClearAllFilters = () => {
    handleClearCityFilters();
    clearFilterSelections();
    setQuery("");
  };

  const hasActiveFilter = hasActiveFilterSelection || query.trim() !== "";

  const filterLabels = useMemo(() => {
    const labels: string[] = [];
    if (selectedCity) {
      labels.push(selectedCity);
    }
    return labels;
  }, [selectedCity]);

  return {
    hospitals: filteredHospitals,
    isLoading,
    refetch,
    query,
    setQuery,
    selectedCity,
    cityFilterVisible,
    cityOptions,
    filterLabels,
    hasActiveFilter,
    openCityFilter,
    closeCityFilter,
    handleCitySelect,
    handleClearCity,
    handleClearAllFilters,
  };
}
