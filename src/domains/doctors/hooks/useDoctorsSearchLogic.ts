import { useMemo } from "react";
import { useSearch } from "@umituz/react-native-search";
import { filterDoctors, type DoctorFilters } from "../utils/filtering";
import type { Doctor } from "../types";
import type { Department } from "@/domains/appointments/types";

export interface UseDoctorsSearchLogicProps {
  doctors: Doctor[];
  selectedSpecialty: string | null;
  selectedHospital: string | null;
}

export interface UseDoctorsSearchLogicReturn {
  query: string;
  setQuery: (query: string) => void;
  filteredDoctors: Doctor[];
}

export function useDoctorsSearchLogic({
  doctors,
  selectedSpecialty,
  selectedHospital,
}: UseDoctorsSearchLogicProps): UseDoctorsSearchLogicReturn {
  const { query, setQuery, debouncedQuery } = useSearch({
    debounceMs: 300,
  });

  const filteredDoctors = useMemo(() => {
    const filters: DoctorFilters = {
      searchQuery: debouncedQuery,
      specialty: selectedSpecialty,
      hospital: selectedHospital,
    };
    return filterDoctors(doctors, filters);
  }, [doctors, debouncedQuery, selectedSpecialty, selectedHospital]);

  return {
    query,
    setQuery,
    filteredDoctors,
  };
}
