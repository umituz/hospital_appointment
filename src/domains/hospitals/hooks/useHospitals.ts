import { useState, useEffect, useCallback } from "react";
import { HospitalRepository } from "../infrastructure/repositories";
import { Hospital } from "../types";
import { storageService } from "../../storage/infrastructure/services";

export function useHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize fetch function to prevent infinite loops
  const fetchHospitals = useCallback(async () => {
    const repository = new HospitalRepository(storageService);
    try {
      setIsLoading(true);
      setError(null);
      const data = await repository.getAll();
      setHospitals(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch hospitals"),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  return {
    hospitals,
    isLoading,
    error,
    refetch: fetchHospitals,
  };
}
