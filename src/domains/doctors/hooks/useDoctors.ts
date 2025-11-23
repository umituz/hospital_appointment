import { useEffect, useCallback } from "react";
import { useDoctorsStore } from "@/core/stores";
import { Doctor } from "../types";
import { GetDoctorsUseCase, GetDoctorsInput } from "../application/use-cases";
import { DoctorRepository } from "../infrastructure/repositories";

export interface UseDoctorsReturn {
  doctors: Doctor[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDoctors(): UseDoctorsReturn {
  const { doctors, isLoading, error, setDoctors, setLoading, setError } =
    useDoctorsStore();

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const useCase = new GetDoctorsUseCase(new DoctorRepository());
      const input: GetDoctorsInput = {};
      const result = await useCase.execute(input);

      if (!result.success) {
        throw new Error("Failed to fetch doctors");
      }

      setDoctors(result.doctors);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch doctors");
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [setDoctors, setLoading, setError]);

  useEffect(() => {
    // Only fetch if we don't have doctors in store
    if (doctors.length === 0) {
      fetchDoctors();
    }
  }, [doctors.length, fetchDoctors]);

  return {
    doctors,
    isLoading,
    error,
    refetch: fetchDoctors,
  };
}
