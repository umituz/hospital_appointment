import { useState, useEffect, useCallback, useMemo } from "react";
import { Hospital } from "../types";
import {
  GetHospitalsUseCase,
  GetHospitalsInput,
} from "../application/use-cases";
import { HospitalRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const useCase = useMemo(
    () => new GetHospitalsUseCase(new HospitalRepository(storageService)),
    [],
  );

  // Memoize fetch function to prevent infinite loops
  const fetchHospitals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const input: GetHospitalsInput = {};
      const result = await useCase.execute(input);

      if (!result.success) {
        throw new Error("Failed to fetch hospitals");
      }

      setHospitals(result.hospitals);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch hospitals"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [useCase]);

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
