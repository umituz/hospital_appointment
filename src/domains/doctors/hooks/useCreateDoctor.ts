import { useState, useCallback, useMemo } from "react";
import { useDoctorsStore } from "@/core/stores";
import { DoctorFormData, Doctor } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import {
  CreateDoctorUseCase,
  CreateDoctorInput,
} from "../application/use-cases";
import { DoctorRepository } from "../infrastructure/repositories";

export function useCreateDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const { addDoctor } = useDoctorsStore();

  const useCase = useMemo(
    () => new CreateDoctorUseCase(new DoctorRepository()),
    [],
  );

  const create = useCallback(
    async (data: DoctorFormData): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        const input: CreateDoctorInput = {
          data,
          t,
        };

        const result = await useCase.execute(input);

        if (!result.success) {
          throw new Error(result.errors?.join(", ") || "Validation failed");
        }

        // Add to Zustand store for immediate UI update
        if (result.doctor) {
          addDoctor(result.doctor);
        }

        return true;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to create doctor");
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t, useCase, addDoctor],
  );

  return {
    create,
    isLoading,
    error,
  };
}
