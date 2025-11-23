import { Doctor } from "../types";

export interface DoctorFilters {
  searchQuery?: string;
  specialty?: string | null;
  hospital?: string | null;
}

export const filterDoctors = (
  doctors: Doctor[],
  filters: DoctorFilters,
): Doctor[] => {
  let filtered = [...doctors];

  if (filters.searchQuery?.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty?.toLowerCase().includes(query),
    );
  }

  if (filters.specialty) {
    filtered = filtered.filter(
      (doctor) => doctor.specialty === filters.specialty,
    );
  }

  if (filters.hospital) {
    filtered = filtered.filter(
      (doctor) => doctor.department_id === filters.hospital,
    );
  }

  return filtered;
};

export const extractSpecialties = (doctors: Doctor[]): string[] => {
  const unique = new Set(doctors.map((d) => d.specialty).filter(Boolean));
  return Array.from(unique).sort();
};
