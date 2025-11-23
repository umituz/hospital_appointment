import { useEffect, useCallback, useMemo } from "react";
import { useHospitalsStore } from "@/core/stores";
import { Hospital } from "../types";
import {
  GetHospitalsUseCase,
  GetHospitalsInput,
} from "../application/use-cases";
import { HospitalRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useHospitals() {
  const { hospitals, isLoading, error, setHospitals, setLoading, setError } =
    useHospitalsStore();

  const useCase = useMemo(
    () => new GetHospitalsUseCase(new HospitalRepository(storageService)),
    [],
  );

  const fetchHospitals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const input: GetHospitalsInput = {};
      const result = await useCase.execute(input);

      if (!result.success) {
        throw new Error("Failed to fetch hospitals");
      }

      setHospitals(result.hospitals);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch hospitals");
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [useCase, setHospitals, setLoading, setError]);

  useEffect(() => {
    // Only fetch if we don't have hospitals in store
    if (hospitals.length === 0) {
      fetchHospitals();
    }
  }, [hospitals.length, fetchHospitals]);

  return {
    hospitals,
    isLoading,
    error,
    refetch: fetchHospitals,
  };
}
