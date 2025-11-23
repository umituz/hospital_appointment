import { useMemo } from "react";
import type { FilterOption } from "@umituz/react-native-filter";
import { extractCities } from "../utils/filtering";
import type { Hospital } from "../types";

export function useHospitalFilterOptions(hospitals: Hospital[]) {
  const cities = useMemo(() => extractCities(hospitals), [hospitals]);

  const cityOptions = useMemo<FilterOption[]>(
    () =>
      cities.map((city) => ({
        id: city,
        label: city,
        icon: "MapPin",
      })),
    [cities],
  );

  return {
    cities,
    cityOptions,
  };
}
