import { useDoctors } from "./useDoctors";
import { useDepartments } from "@/domains/appointments";
import { useDoctorsSearchLogic } from "./useDoctorsSearchLogic";
import { useDoctorsFilterLogic } from "./useDoctorsFilterLogic";
import { useDoctorsDeleteLogic } from "./useDoctorsDeleteLogic";

export function useDoctorsList() {
  const { doctors, isLoading, refetch } = useDoctors();
  const { departments } = useDepartments(undefined);

  const {
    selectedSpecialty,
    selectedHospital,
    specialtyFilterVisible,
    hospitalFilterVisible,
    specialtyOptions,
    hospitalOptions,
    hasActiveFilter: hasFilterSelection,
    filterLabels,
    openSpecialtyFilter,
    closeSpecialtyFilter,
    openHospitalFilter,
    closeHospitalFilter,
    handleSpecialtySelect,
    handleHospitalSelect,
    handleClearSpecialty,
    handleClearHospital,
    handleClearAllFilters: clearAllFilters,
  } = useDoctorsFilterLogic({
    doctors,
    departments,
  });

  const { query, setQuery, filteredDoctors } = useDoctorsSearchLogic({
    doctors,
    selectedSpecialty,
    selectedHospital,
  });

  const { handleDelete } = useDoctorsDeleteLogic({
    onSuccess: refetch,
  });

  const handleClearAllFilters = () => {
    clearAllFilters();
    setQuery("");
  };

  const hasActiveFilter = hasFilterSelection || query.trim() !== "";

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
    handleDelete,
  };
}
