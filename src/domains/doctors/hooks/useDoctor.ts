import { useState, useEffect, useCallback, useMemo } from "react";
import { Doctor } from "../types";
import { GetDoctorUseCase, GetDoctorInput } from "../application/use-cases";
import { DoctorRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useDoctor(id: string | undefined) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const useCase = useMemo(
    () => new GetDoctorUseCase(new DoctorRepository(storageService)),
    [],
  );

  const fetchDoctor = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      setDoctor(null);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const input: GetDoctorInput = {
        id,
      };

      const result = await useCase.execute(input);

      if (!result.success) {
        throw new Error("Failed to fetch doctor");
      }

      setDoctor(result.doctor);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch doctor"),
      );
      setDoctor(null);
    } finally {
      setIsLoading(false);
    }
  }, [id, useCase]);

  useEffect(() => {
    fetchDoctor();
  }, [fetchDoctor]);

  return {
    doctor,
    isLoading,
    error,
  };
}
