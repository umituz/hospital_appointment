import type { Doctor } from "@/domains/doctors/types";
import type { DoctorFilterCriteria } from "../../types";
import { BaseFilterRepository } from "./BaseFilterRepository";

export class DoctorFilterRepository extends BaseFilterRepository<
  Doctor,
  DoctorFilterCriteria
> {
  filter(doctors: Doctor[], criteria: DoctorFilterCriteria): Doctor[] {
    let filtered = [...doctors];

    // Apply search filter
    if (criteria.searchQuery) {
      filtered = this.applySearchFilter(filtered, criteria.searchQuery, [
        "name",
        "specialty",
      ]);
    }

    // Apply specialty filter
    if (criteria.specialty) {
      filtered = this.applySingleFilter(
        filtered,
        criteria.specialty,
        "specialty",
      );
    }

    // Apply hospital filter (department_id)
    if (criteria.hospital) {
      filtered = this.applySingleFilter(
        filtered,
        criteria.hospital,
        "department_id",
      );
    }

    return filtered;
  }

  protected extractUniqueValues(
    doctors: Doctor[],
    filterKey: string,
  ): unknown[] {
    switch (filterKey) {
      case "specialty":
        return [...new Set(doctors.map((d) => d.specialty).filter(Boolean))];
      case "hospital":
      case "department_id":
        return [
          ...new Set(doctors.map((d) => d.department_id).filter(Boolean)),
        ];
      default:
        return [];
    }
  }

  getSpecialtyOptions(doctors: Doctor[]) {
    return this.getFilterOptions(doctors, "specialty");
  }

  getHospitalOptions(doctors: Doctor[]) {
    return this.getFilterOptions(doctors, "hospital");
  }
}
