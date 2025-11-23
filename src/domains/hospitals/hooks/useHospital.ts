import { useState, useEffect, useCallback, useMemo } from "react";
import { Hospital } from "../types";
import { GetHospitalUseCase, GetHospitalInput } from "../application/use-cases";
import { HospitalRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useHospital(id: string | undefined) {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const useCase = useMemo(
    () => new GetHospitalUseCase(new HospitalRepository(storageService)),
    [],
  );

  const fetchHospital = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      setHospital(null);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const input: GetHospitalInput = {
        id,
      };

      const result = await useCase.execute(input);

      if (!result.success) {
        throw new Error("Failed to fetch hospital");
      }

      setHospital(result.hospital);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch hospital"),
      );
      setHospital(null);
    } finally {
      setIsLoading(false);
    }
  }, [id, useCase]);

  useEffect(() => {
    fetchHospital();
  }, [fetchHospital]);

  return {
    hospital,
    isLoading,
    error,
  };
}
