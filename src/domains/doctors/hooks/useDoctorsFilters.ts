import { useState, useMemo, useCallback } from "react";
import type { Doctor } from "../types";
import type { Department } from "@/domains/appointments/types";

export interface UseDoctorsFiltersReturn {
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
  clearAllFilters: () => void;
}

export function useDoctorsFilters(
  doctors: Doctor[],
  departments: Department[],
): UseDoctorsFiltersReturn {
  // Filter state management
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [specialtyFilterVisible, setSpecialtyFilterVisible] = useState(false);
  const [hospitalFilterVisible, setHospitalFilterVisible] = useState(false);

  // Generate filter options
  const specialtyOptions = useMemo(() => {
    const specialties = [...new Set(doctors.map((d) => d.specialty))];
    return specialties.map((specialty) => ({
      id: specialty,
      label: specialty,
    }));
  }, [doctors]);

  const hospitalOptions = useMemo(() => {
    return departments.map((dept) => ({
      id: dept.id,
      label: dept.name,
    }));
  }, [departments]);

  // Filter handlers
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

  const handleSpecialtySelect = useCallback((specialty: string) => {
    setSelectedSpecialty(specialty || null);
    setSpecialtyFilterVisible(false);
  }, []);

  const handleHospitalSelect = useCallback((hospitalId: string) => {
    setSelectedHospital(hospitalId || null);
    setHospitalFilterVisible(false);
  }, []);

  const handleClearSpecialty = useCallback(() => {
    setSelectedSpecialty(null);
    setSpecialtyFilterVisible(false);
  }, []);

  const handleClearHospital = useCallback(() => {
    setSelectedHospital(null);
    setHospitalFilterVisible(false);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedSpecialty(null);
    setSelectedHospital(null);
    setSpecialtyFilterVisible(false);
    setHospitalFilterVisible(false);
  }, []);

  // Active filter detection
  const hasActiveFilter =
    selectedSpecialty !== null || selectedHospital !== null;

  // Filter labels for display
  const filterLabels = useMemo(() => {
    const labels: string[] = [];
    if (selectedSpecialty) {
      labels.push(selectedSpecialty);
    }
    if (selectedHospital) {
      const dept = departments.find((d) => d.id === selectedHospital);
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
    clearAllFilters,
  };
}
