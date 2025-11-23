import { useState } from "react";
import { useHospitals } from "./useHospitals";

export function useHospitalsList() {
  const { hospitals, isLoading, refetch } = useHospitals();
  const [query, setQuery] = useState("");

  // Simple search filter
  const filteredHospitals = hospitals.filter(
    (hospital) =>
      query === "" ||
      hospital.name.toLowerCase().includes(query.toLowerCase()) ||
      (hospital.address &&
        hospital.address.toLowerCase().includes(query.toLowerCase())) ||
      (hospital.phone && hospital.phone.includes(query)),
  );

  return {
    hospitals: filteredHospitals,
    isLoading,
    refetch,
    query,
    setQuery,
  };
}
