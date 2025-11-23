import { useState, useCallback } from "react";

export interface DoctorFilterState {
  selectedSpecialty: string | null;
  selectedHospital: string | null;
  specialtyFilterVisible: boolean;
  hospitalFilterVisible: boolean;
}

export function useDoctorFilters() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [specialtyFilterVisible, setSpecialtyFilterVisible] = useState(false);
  const [hospitalFilterVisible, setHospitalFilterVisible] = useState(false);

  const openSpecialtyFilter = useCallback(() => {
    setSpecialtyFilterVisible(true);
  }, []);

  const closeSpecialtyFilter = useCallback(() => {
    setSpecialtyFilterVisible(false);
  }, []);

  const openHospitalFilter = useCallback(() => {
    setHospitalFilterVisible(true);
  }, []);

  const closeHospitalFilter = useCallback(() => {
    setHospitalFilterVisible(false);
  }, []);

  const selectSpecialty = useCallback((specialty: string | null) => {
    setSelectedSpecialty(specialty);
    setSpecialtyFilterVisible(false);
  }, []);

  const selectHospital = useCallback((hospital: string | null) => {
    setSelectedHospital(hospital);
    setHospitalFilterVisible(false);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedSpecialty(null);
    setSelectedHospital(null);
  }, []);

  const hasActiveFilter =
    selectedSpecialty !== null || selectedHospital !== null;

  return {
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
    clearFilters,
    hasActiveFilter,
  };
}
