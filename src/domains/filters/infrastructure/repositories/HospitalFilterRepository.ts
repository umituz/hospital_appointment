import type { Hospital } from "@/domains/hospitals/types";
import type { HospitalFilterCriteria } from "../../types";
import { BaseFilterRepository } from "./BaseFilterRepository";

export class HospitalFilterRepository extends BaseFilterRepository<
  Hospital,
  HospitalFilterCriteria
> {
  filter(hospitals: Hospital[], criteria: HospitalFilterCriteria): Hospital[] {
    let filtered = [...hospitals];

    // Apply search filter
    if (criteria.searchQuery) {
      filtered = this.applySearchFilter(filtered, criteria.searchQuery, [
        "name",
        "address",
        "phone",
      ]);
    }

    // Apply city filter
    if (criteria.city) {
      filtered = hospitals.filter((hospital) => {
        if (!hospital.address) return false;
        const city = this.extractCityFromAddress(hospital.address);
        return city?.toLowerCase().includes(criteria.city!.toLowerCase());
      });
    }

    return filtered;
  }

  protected extractUniqueValues(
    hospitals: Hospital[],
    filterKey: string,
  ): unknown[] {
    switch (filterKey) {
      case "city":
        return hospitals
          .map((h) =>
            h.address ? this.extractCityFromAddress(h.address) : null,
          )
          .filter(Boolean);
      default:
        return [];
    }
  }

  private extractCityFromAddress(address: string): string | null {
    const parts = address.split(",");
    if (parts.length > 1) {
      return parts[parts.length - 1].trim();
    }
    return null;
  }

  getCityOptions(hospitals: Hospital[]) {
    const cities = hospitals
      .map((h) => (h.address ? this.extractCityFromAddress(h.address) : null))
      .filter((city): city is string => Boolean(city));

    const uniqueCities = [...new Set(cities)].sort();

    return uniqueCities.map((city, index) => ({
      id: `city-${index}`,
      label: city,
      value: city,
    }));
  }
}
