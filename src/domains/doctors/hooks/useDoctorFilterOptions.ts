import { useMemo } from "react";
import type { FilterOption } from "@umituz/react-native-filter";
import { extractSpecialties } from "../utils/filtering";
import type { Doctor } from "../types";
import type { Department } from "@/domains/appointments/types";

export function useDoctorFilterOptions(
  doctors: Doctor[],
  departments: Department[],
) {
  const specialties = useMemo(() => extractSpecialties(doctors), [doctors]);

  const specialtyOptions = useMemo<FilterOption[]>(
    () =>
      specialties.map((specialty) => ({
        id: specialty,
        label: specialty,
        icon: "Stethoscope",
      })),
    [specialties],
  );

  const hospitalOptions = useMemo<FilterOption[]>(
    () =>
      departments.map((dept) => ({
        id: dept.id.toString(),
        label: dept.name,
        icon: "Building",
      })),
    [departments],
  );

  return {
    specialties,
    specialtyOptions,
    hospitalOptions,
  };
}
