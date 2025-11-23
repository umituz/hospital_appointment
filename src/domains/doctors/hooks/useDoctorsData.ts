import { useCallback, useMemo } from "react";
import { GetDoctorsUseCase, GetDoctorsInput } from "../application/use-cases";
import { DoctorRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";
import { DoctorsStateActions } from "./useDoctorsState";
import { UseDoctorsErrorReturn } from "./useDoctorsError";

export interface UseDoctorsDataReturn {
  fetchDoctors: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useDoctorsData(
  actions: DoctorsStateActions,
  errorHandler: UseDoctorsErrorReturn,
): UseDoctorsDataReturn {
  const useCase = useMemo(
    () => new GetDoctorsUseCase(new DoctorRepository(storageService)),
    [],
  );

  const fetchDoctors = useCallback(async () => {
    try {
      actions.setIsLoading(true);
      errorHandler.clearError();

      const input: GetDoctorsInput = {};
      const result = await useCase.execute(input);

      if (!result.success) {
        throw errorHandler.createError("Failed to fetch doctors");
      }

      actions.setDoctors(result.doctors);
    } catch (error) {
      errorHandler.handleError(error, "Failed to fetch doctors");
    } finally {
      actions.setIsLoading(false);
    }
  }, [useCase, actions, errorHandler]);

  const refetch = useCallback(async () => {
    await fetchDoctors();
  }, [fetchDoctors]);

  return {
    fetchDoctors,
    refetch,
  };
}
