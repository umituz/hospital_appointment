import { useMemo } from "react";
import { useSearch } from "@umituz/react-native-search";
import { useListFilters } from "@umituz/react-native-filter";
import { useDoctors } from "./useDoctors";
import { useDepartments } from "@/domains/appointments";
import { useDoctorFilters } from "./useDoctorFilters";
import { useDoctorFilterOptions } from "./useDoctorFilterOptions";
import { filterDoctors, type DoctorFilters } from "../utils/filtering";
import type { Department } from "@/domains/appointments/types";

export function useDoctorsList() {
  const { doctors, isLoading, refetch } = useDoctors();
  const { departments } = useDepartments(undefined);
  const { query, setQuery, debouncedQuery } = useSearch({
    debounceMs: 300,
  });

  const {
    selectedSpecialty,
    selectedHospital,
    specialtyFilterVisible,
    hospitalFilterVisible,
    openSpecialtyFilter,
    closeSpecialtyFilter,
    openHospitalFilter,
    closeHospitalFilter,
    selectSpecialty,
    selectHospital,
    clearFilters: clearFilterSelections,
    hasActiveFilter: hasActiveFilterSelection,
  } = useDoctorFilters();

  const { specialtyOptions, hospitalOptions } = useDoctorFilterOptions(
    doctors,
    departments,
  );

  const {
    handleFilterPress: handleSpecialtyFilterPress,
    handleClearFilters: handleClearSpecialtyFilters,
  } = useListFilters({
    options: specialtyOptions,
    defaultFilterId: "",
    singleSelect: true,
  });

  const {
    handleFilterPress: handleHospitalFilterPress,
    handleClearFilters: handleClearHospitalFilters,
  } = useListFilters({
    options: hospitalOptions,
    defaultFilterId: "",
    singleSelect: true,
  });

  const filteredDoctors = useMemo(() => {
    const filters: DoctorFilters = {
      searchQuery: debouncedQuery,
      specialty: selectedSpecialty,
      hospital: selectedHospital,
    };
    return filterDoctors(doctors, filters);
  }, [doctors, debouncedQuery, selectedSpecialty, selectedHospital]);

  const handleSpecialtySelect = (filterId: string) => {
    const specialty = filterId || null;
    handleSpecialtyFilterPress(filterId);
    selectSpecialty(specialty);
  };

  const handleHospitalSelect = (filterId: string) => {
    const hospital = filterId || null;
    handleHospitalFilterPress(filterId);
    selectHospital(hospital);
  };

  const handleClearSpecialty = () => {
    handleClearSpecialtyFilters();
    selectSpecialty(null);
    closeSpecialtyFilter();
  };

  const handleClearHospital = () => {
    handleClearHospitalFilters();
    selectHospital(null);
    closeHospitalFilter();
  };

  const handleClearAllFilters = () => {
    handleClearSpecialtyFilters();
    handleClearHospitalFilters();
    clearFilterSelections();
    setQuery("");
  };

  const hasActiveFilter = hasActiveFilterSelection || query.trim() !== "";

  const filterLabels = useMemo(() => {
    const labels: string[] = [];
    if (selectedSpecialty) {
      labels.push(selectedSpecialty);
    }
    if (selectedHospital) {
      const dept = departments.find(
        (d) => d.id.toString() === selectedHospital,
      );
      if (dept) {
        labels.push(dept.name);
      }
    }
    return labels;
  }, [selectedSpecialty, selectedHospital, departments]);

  return {
    doctors: filteredDoctors,
    isLoading,
    refetch,
    query,
    setQuery,
    selectedSpecialty,
    selectedHospital,
    specialtyFilterVisible,
    hospitalFilterVisible,
    specialtyOptions,
    hospitalOptions,
    filterLabels,
    hasActiveFilter,
    openSpecialtyFilter,
    closeSpecialtyFilter,
    openHospitalFilter,
    closeHospitalFilter,
    handleSpecialtySelect,
    handleHospitalSelect,
    handleClearSpecialty,
    handleClearHospital,
    handleClearAllFilters,
  };
}
