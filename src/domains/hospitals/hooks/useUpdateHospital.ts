import { useState, useCallback, useMemo } from "react";
import { HospitalFormData } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import {
  UpdateHospitalUseCase,
  UpdateHospitalInput,
} from "../application/use-cases";
import { HospitalRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useUpdateHospital() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();

  const useCase = useMemo(
    () => new UpdateHospitalUseCase(new HospitalRepository(storageService)),
    [],
  );

  const update = useCallback(
    async (id: string, data: Partial<HospitalFormData>) => {
      try {
        setIsLoading(true);
        setError(null);

        const input: UpdateHospitalInput = {
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
          err instanceof Error ? err : new Error("Failed to update hospital");
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
