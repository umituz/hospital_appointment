import { useState, useCallback, useMemo } from "react";
import { DoctorFormData } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import {
  UpdateDoctorUseCase,
  UpdateDoctorInput,
} from "../application/use-cases";
import { DoctorRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useUpdateDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();

  const useCase = useMemo(
    () => new UpdateDoctorUseCase(new DoctorRepository(storageService)),
    [],
  );

  const update = useCallback(
    async (id: string, data: Partial<DoctorFormData>) => {
      try {
        setIsLoading(true);
        setError(null);

        const input: UpdateDoctorInput = {
          id,
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
          err instanceof Error ? err : new Error("Failed to update doctor");
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t, useCase],
  );

  return {
    update,
    isLoading,
    error,
  };
}
