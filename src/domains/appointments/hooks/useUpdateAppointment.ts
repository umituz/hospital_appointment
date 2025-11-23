import { useState, useCallback, useMemo } from "react";
import { AppointmentFormData } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import {
  UpdateAppointmentUseCase,
  UpdateAppointmentInput,
} from "../application/use-cases";
import { AppointmentRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useUpdateAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();

  const useCase = useMemo(
    () =>
      new UpdateAppointmentUseCase(new AppointmentRepository(storageService)),
    [],
  );

  const update = useCallback(
    async (id: string, data: AppointmentFormData) => {
      try {
        setIsLoading(true);
        setError(null);

        const input: UpdateAppointmentInput = {
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
          err instanceof Error
            ? err
            : new Error("Failed to update appointment");
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
