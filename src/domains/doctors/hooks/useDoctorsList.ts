import { useState } from "react";
import { useDoctors } from "./useDoctors";

export function useDoctorsList() {
  const { doctors, isLoading, refetch } = useDoctors();
  const [query, setQuery] = useState("");

  // Simple search filter
  const filteredDoctors = doctors.filter(
    (doctor) =>
      query === "" ||
      doctor.name.toLowerCase().includes(query.toLowerCase()) ||
      (doctor.specialty &&
        doctor.specialty.toLowerCase().includes(query.toLowerCase())),
  );

  return {
    doctors: filteredDoctors,
    isLoading,
    refetch,
    query,
    setQuery,
  };
}
