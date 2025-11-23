import { useHospitals } from "./useHospitals";
import { useHospitalsFilters } from "./useHospitalsFilters";

export function useHospitalsList() {
  const { hospitals, isLoading, refetch } = useHospitals();

  const {
    hospitals: filteredHospitals,
    query,
    setQuery,
    selectedCity,
    cityFilterVisible,
    cityOptions,
    filterLabels,
    hasActiveFilter,
    openCityFilter,
    closeCityFilter,
    selectCity: handleCitySelect,
    clearCityFilter: handleClearCity,
    clearAllFilters: handleClearAllFilters,
  } = useHospitalsFilters(hospitals);

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
