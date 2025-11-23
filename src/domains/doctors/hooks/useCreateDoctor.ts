import { useState, useCallback, useMemo } from "react";
import { DoctorFormData } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import {
  CreateDoctorUseCase,
  CreateDoctorInput,
} from "../application/use-cases";
import { DoctorRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useCreateDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();

  const useCase = useMemo(
    () => new CreateDoctorUseCase(new DoctorRepository(storageService)),
    [],
  );

  const create = useCallback(
    async (data: DoctorFormData) => {
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
    [t, useCase],
  );

  return {
    create,
    isLoading,
    error,
  };
}
