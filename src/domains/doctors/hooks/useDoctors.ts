import { useState, useEffect, useCallback } from "react";
import { Doctor } from "../types";
import { GetDoctorsUseCase, GetDoctorsInput } from "../application/use-cases";
import { DoctorRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export interface UseDoctorsReturn {
  doctors: Doctor[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDoctors(): UseDoctorsReturn {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDoctors = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const useCase = new GetDoctorsUseCase(new DoctorRepository());
      const input: GetDoctorsInput = {};
      const result = await useCase.execute(input);

      if (!result.success) {
        throw new Error("Failed to fetch doctors");
      }

      setDoctors(result.doctors);
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
  }, []);

  return {
    doctors,
    isLoading,
    error,
    refetch: fetchDoctors,
  };
}
