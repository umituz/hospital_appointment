import { useState, useCallback, useMemo } from "react";
import { useDoctorsStore } from "@/core/stores";
import { DoctorFormData } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import {
  UpdateDoctorUseCase,
  UpdateDoctorInput,
} from "../application/use-cases";
import { DoctorRepository } from "../infrastructure/repositories";

export function useUpdateDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const { updateDoctor } = useDoctorsStore();

  const useCase = useMemo(
    () => new UpdateDoctorUseCase(new DoctorRepository()),
    [],
  );

  const update = useCallback(
    async (id: string, data: Partial<DoctorFormData>): Promise<boolean> => {
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

        // Update in Zustand store for immediate UI update
        if (result.doctor) {
          updateDoctor(id, result.doctor);
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
    [t, useCase, updateDoctor],
  );

  return {
    update,
    isLoading,
    error,
  };
}
