import { useDoctors } from "./useDoctors";
import { useDepartments } from "@/domains/appointments";
import { useDoctorsSearch } from "./useDoctorsSearch";
import { useDoctorsFilters } from "./useDoctorsFilters";
import { useDoctorsActions } from "./useDoctorsActions";

export interface UseDoctorsListReturn {
  doctors: any[];
  isLoading: boolean;
  refetch: () => Promise<void>;
  query: string;
  setQuery: (query: string) => void;
  selectedSpecialty: string | null;
  selectedHospital: string | null;
  specialtyFilterVisible: boolean;
  hospitalFilterVisible: boolean;
  specialtyOptions: Array<{ id: string; label: string }>;
  hospitalOptions: Array<{ id: string; label: string }>;
  filterLabels: string[];
  hasActiveFilter: boolean;
  openSpecialtyFilter: () => void;
  closeSpecialtyFilter: () => void;
  openHospitalFilter: () => void;
  closeHospitalFilter: () => void;
  handleSpecialtySelect: (filterId: string) => void;
  handleHospitalSelect: (filterId: string) => void;
  handleClearSpecialty: () => void;
  handleClearHospital: () => void;
  handleClearAllFilters: () => void;
}

export function useDoctorsList(): UseDoctorsListReturn {
  const { doctors, isLoading, refetch } = useDoctors();
  const { departments } = useDepartments(undefined);

  const search = useDoctorsSearch();
  const filters = useDoctorsFilters(doctors, departments);

  const filteredDoctors = useFilteredDoctors(
    doctors,
    search.query,
    filters.selectedSpecialty,
    filters.selectedHospital,
  );

  const hasActiveFilter = filters.hasActiveFilter || search.query.trim() !== "";

  const handleClearAllFilters = () => {
    filters.clearAllFilters();
    search.setQuery("");
  };

  return {
    doctors: filteredDoctors,
    isLoading,
    refetch,
    query: search.query,
    setQuery: search.setQuery,
    selectedSpecialty: filters.selectedSpecialty,
    selectedHospital: filters.selectedHospital,
    specialtyFilterVisible: filters.specialtyFilterVisible,
    hospitalFilterVisible: filters.hospitalFilterVisible,
    specialtyOptions: filters.specialtyOptions,
    hospitalOptions: filters.hospitalOptions,
    filterLabels: filters.filterLabels,
    hasActiveFilter,
    openSpecialtyFilter: filters.openSpecialtyFilter,
    closeSpecialtyFilter: filters.closeSpecialtyFilter,
    openHospitalFilter: filters.openHospitalFilter,
    closeHospitalFilter: filters.closeHospitalFilter,
    handleSpecialtySelect: filters.handleSpecialtySelect,
    handleHospitalSelect: filters.handleHospitalSelect,
    handleClearSpecialty: filters.handleClearSpecialty,
    handleClearHospital: filters.handleClearHospital,
    handleClearAllFilters,
  };
}

// Helper hook for filtering doctors
function useFilteredDoctors(
  doctors: any[],
  query: string,
  selectedSpecialty: string | null,
  selectedHospital: string | null,
) {
  return doctors.filter((doctor) => {
    // Search filter
    if (query && !doctor.name.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    // Specialty filter
    if (selectedSpecialty && doctor.specialty !== selectedSpecialty) {
      return false;
    }

    // Hospital filter
    if (selectedHospital && doctor.hospital_id !== selectedHospital) {
      return false;
    }

    return true;
  });
}
