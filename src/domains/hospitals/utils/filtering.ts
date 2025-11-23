import { Hospital } from "../types";

export interface HospitalFilters {
  searchQuery?: string;
  city?: string | null;
}

export const filterHospitals = (
  hospitals: Hospital[],
  filters: HospitalFilters,
): Hospital[] => {
  let filtered = [...hospitals];

  if (filters.searchQuery?.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(query) ||
        hospital.address?.toLowerCase().includes(query) ||
        hospital.phone?.toLowerCase().includes(query),
    );
  }

  if (filters.city) {
    filtered = filtered.filter((hospital) =>
      hospital.address?.toLowerCase().includes(filters.city!.toLowerCase()),
    );
  }

  return filtered;
};

export const extractCities = (hospitals: Hospital[]): string[] => {
  const cities = new Set<string>();
  hospitals.forEach((hospital) => {
    if (hospital.address) {
      const parts = hospital.address.split(",");
      if (parts.length > 1) {
        const city = parts[parts.length - 1].trim();
        if (city) {
          cities.add(city);
        }
      }
    }
  });
  return Array.from(cities).sort();
};
