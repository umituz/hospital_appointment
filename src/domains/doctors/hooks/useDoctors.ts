import { useState, useEffect, useCallback } from "react";
import { DoctorRepository } from "../infrastructure/repositories";
import { Doctor } from "../types";
import { storageService } from "../../storage/infrastructure/services";

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize fetch function to prevent infinite loops
  const fetchDoctors = useCallback(async () => {
    const repository = new DoctorRepository(storageService);
    try {
      setIsLoading(true);
      setError(null);
      const data = await repository.getAll();
      setDoctors(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch doctors"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
    isLoading,
    error,
    refetch: fetchDoctors,
  };
}
