import { useState, useCallback, useMemo } from "react";
import { HospitalFormData } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import {
  CreateHospitalUseCase,
  CreateHospitalInput,
} from "../application/use-cases";
import { HospitalRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useCreateHospital() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();

  const useCase = useMemo(
    () => new CreateHospitalUseCase(new HospitalRepository(storageService)),
    [],
  );

  const create = useCallback(
    async (data: HospitalFormData) => {
      try {
        setIsLoading(true);
        setError(null);

        const input: CreateHospitalInput = {
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
          err instanceof Error ? err : new Error("Failed to create hospital");
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
