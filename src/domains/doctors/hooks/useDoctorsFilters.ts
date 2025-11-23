import { useMemo } from "react";
import { useSearch } from "@umituz/react-native-search";
import {
  DoctorFilterRepository,
  useFilterManager,
  type DoctorFilterCriteria,
} from "@/domains/filters";
import type { Department } from "@/domains/appointments/types";
import type { FilterOption } from "@/domains/filters/types";

const doctorFilterRepository = new DoctorFilterRepository();

export function useDoctorsFilters(
  doctors: any[],
  departments: Department[] = [],
) {
  const { query, setQuery, debouncedQuery } = useSearch({
    debounceMs: 300,
  });

  const filterCriteria: DoctorFilterCriteria = useMemo(
    () => ({
      searchQuery: debouncedQuery,
      specialty: null, // Will be set by the manager
      hospital: null, // Will be set by the manager
    }),
    [debouncedQuery],
  );

  const {
    filteredItems: filteredDoctors,
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
    items: doctors,
    repository: doctorFilterRepository,
    initialFilters: filterCriteria,
  });

  const specialtyOptions: FilterOption[] = useMemo(() => {
    const options = getFilterOptions("specialty");
    return options.map((option) => ({
      id: option.value,
      label: option.label,
      value: option.value,
    }));
  }, [getFilterOptions]);

  const hospitalOptions: FilterOption[] = useMemo(() => {
    const options = getFilterOptions("hospital");
    return options
      .map((option) => {
        const dept = departments.find((d) => d.id.toString() === option.value);
        return {
          id: option.value,
          label: dept?.name || option.label,
          value: option.value,
        };
      })
      .filter((option) => option.label !== option.value); // Remove options without department names
  }, [getFilterOptions, departments]);

  const filterLabels = useMemo(() => {
    const labels: string[] = [];
    const specialty = getFilterValue<string>("specialty");
    const hospital = getFilterValue<string>("hospital");

    if (specialty) {
      labels.push(specialty);
    }
    if (hospital) {
      const dept = departments.find((d) => d.id.toString() === hospital);
      if (dept) {
        labels.push(dept.name);
      }
    }
    return labels;
  }, [getFilterValue, departments]);

  const selectSpecialty = (specialty: string | null) => {
    applyFilter("specialty", specialty);
  };

  const selectHospital = (hospital: string | null) => {
    applyFilter("hospital", hospital);
  };

  const clearSpecialtyFilter = () => {
    resetFilter("specialty");
  };

  const clearHospitalFilter = () => {
    resetFilter("hospital");
  };

  const clearAllFiltersAction = () => {
    resetAllFilters();
    setQuery("");
  };

  const hasActiveFilter = hasActiveFilters || query.trim() !== "";

  return {
    // Data
    doctors: filteredDoctors,
    query,
    setQuery,

    // Filter state
    selectedSpecialty: getFilterValue<string>("specialty"),
    selectedHospital: getFilterValue<string>("hospital"),

    // Filter options
    specialtyOptions,
    hospitalOptions,

    // UI state
    specialtyFilterVisible: isFilterVisible("specialty"),
    hospitalFilterVisible: isFilterVisible("hospital"),

    // Actions
    openSpecialtyFilter: () => openFilter("specialty"),
    closeSpecialtyFilter: () => closeFilter("specialty"),
    openHospitalFilter: () => openFilter("hospital"),
    closeHospitalFilter: () => closeFilter("hospital"),

    selectSpecialty,
    selectHospital,
    clearSpecialtyFilter,
    clearHospitalFilter,
    clearAllFilters: clearAllFiltersAction,

    // Computed
    hasActiveFilter,
    filterLabels,
  };
}
