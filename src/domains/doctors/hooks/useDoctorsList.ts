import { useDoctors } from "./useDoctors";
import { useDepartments } from "@/domains/appointments";
import { useDoctorsFilters } from "./useDoctorsFilters";

export function useDoctorsList() {
  const { doctors, isLoading, refetch } = useDoctors();
  const { departments } = useDepartments(undefined);

  const {
    doctors: filteredDoctors,
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
    selectSpecialty: handleSpecialtySelect,
    selectHospital: handleHospitalSelect,
    clearSpecialtyFilter: handleClearSpecialty,
    clearHospitalFilter: handleClearHospital,
    clearAllFilters: handleClearAllFilters,
  } = useDoctorsFilters(doctors, departments);

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
