import { useMemo, useCallback } from "react";
import { useListFilters } from "@umituz/react-native-filter";
import { useDoctorFilters } from "./useDoctorFilters";
import { useDoctorFilterOptions } from "./useDoctorFilterOptions";
import type { Doctor } from "../types";
import type { Department } from "@/domains/appointments/types";

export interface UseDoctorsFilterLogicProps {
  doctors: Doctor[];
  departments: Department[];
}

export interface UseDoctorsFilterLogicReturn {
  selectedSpecialty: string | null;
  selectedHospital: string | null;
  specialtyFilterVisible: boolean;
  hospitalFilterVisible: boolean;
  specialtyOptions: Array<{ id: string; label: string }>;
  hospitalOptions: Array<{ id: string; label: string }>;
  hasActiveFilter: boolean;
  filterLabels: string[];
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

export function useDoctorsFilterLogic({
  doctors,
  departments,
}: UseDoctorsFilterLogicProps): UseDoctorsFilterLogicReturn {
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

  const handleSpecialtySelect = useCallback(
    (filterId: string) => {
      const specialty = filterId || null;
      handleSpecialtyFilterPress(filterId);
      selectSpecialty(specialty);
    },
    [handleSpecialtyFilterPress, selectSpecialty],
  );

  const handleHospitalSelect = useCallback(
    (filterId: string) => {
      const hospital = filterId || null;
      handleHospitalFilterPress(filterId);
      selectHospital(hospital);
    },
    [handleHospitalFilterPress, selectHospital],
  );

  const handleClearSpecialty = useCallback(() => {
    handleClearSpecialtyFilters();
    selectSpecialty(null);
    closeSpecialtyFilter();
  }, [handleClearSpecialtyFilters, selectSpecialty, closeSpecialtyFilter]);

  const handleClearHospital = useCallback(() => {
    handleClearHospitalFilters();
    selectHospital(null);
    closeHospitalFilter();
  }, [handleClearHospitalFilters, selectHospital, closeHospitalFilter]);

  const handleClearAllFilters = useCallback(() => {
    handleClearSpecialtyFilters();
    handleClearHospitalFilters();
    clearFilterSelections();
  }, [
    handleClearSpecialtyFilters,
    handleClearHospitalFilters,
    clearFilterSelections,
  ]);

  const hasActiveFilter = hasActiveFilterSelection;

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
    selectedSpecialty,
    selectedHospital,
    specialtyFilterVisible,
    hospitalFilterVisible,
    specialtyOptions,
    hospitalOptions,
    hasActiveFilter,
    filterLabels,
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
