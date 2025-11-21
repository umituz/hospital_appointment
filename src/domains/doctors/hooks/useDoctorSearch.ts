import { useState, useMemo, useCallback } from "react";
import { Doctor } from "../types";

export function useDoctorSearch(doctors: Doctor[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  const filteredDoctors = useMemo(() => {
    let filtered = doctors;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.specialty?.toLowerCase().includes(query) ||
          doctor.department_id?.toLowerCase().includes(query),
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === selectedSpecialty,
      );
    }

    if (selectedHospital) {
      filtered = filtered.filter(
        (doctor) => doctor.department_id === selectedHospital,
      );
    }

    return filtered;
  }, [doctors, searchQuery, selectedSpecialty, selectedHospital]);

  const specialties = useMemo(() => {
    const unique = new Set(doctors.map((d) => d.specialty).filter(Boolean));
    return Array.from(unique).sort();
  }, [doctors]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedSpecialty(null);
    setSelectedHospital(null);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    selectedSpecialty,
    setSelectedSpecialty,
    selectedHospital,
    setSelectedHospital,
    filteredDoctors,
    specialties,
    clearFilters,
    hasActiveFilters:
      searchQuery.trim() !== "" ||
      selectedSpecialty !== null ||
      selectedHospital !== null,
  };
}
