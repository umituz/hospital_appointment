import { useState, useCallback } from "react";

export function useHospitalFilters() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cityFilterVisible, setCityFilterVisible] = useState(false);

  const openCityFilter = useCallback(() => {
    setCityFilterVisible(true);
  }, []);

  const closeCityFilter = useCallback(() => {
    setCityFilterVisible(false);
  }, []);

  const selectCity = useCallback((city: string | null) => {
    setSelectedCity(city);
    setCityFilterVisible(false);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCity(null);
  }, []);

  const hasActiveFilter = selectedCity !== null;

  return {
    selectedCity,
    cityFilterVisible,
    openCityFilter,
    closeCityFilter,
    selectCity,
    clearFilters,
    hasActiveFilter,
  };
}
