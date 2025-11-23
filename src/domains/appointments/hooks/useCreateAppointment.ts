import { useState, useCallback, useMemo } from "react";
import { useAppointmentsStore } from "@/core/stores";
import { AppointmentFormData } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import {
  CreateAppointmentUseCase,
  CreateAppointmentInput,
} from "../application/use-cases";
import { AppointmentRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useCreateAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const { addAppointment } = useAppointmentsStore();

  const useCase = useMemo(
    () =>
      new CreateAppointmentUseCase(new AppointmentRepository(storageService)),
    [],
  );

  const create = useCallback(
    async (data: AppointmentFormData): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        const input: CreateAppointmentInput = {
          data,
          t,
        };

        const result = await useCase.execute(input);

        if (!result.success) {
          throw new Error(result.errors?.join(", ") || "Validation failed");
        }

        // Add to Zustand store for immediate UI update
        if (result.appointment) {
          addAppointment(result.appointment);
        }

        return true;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to create appointment");
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t, useCase, addAppointment],
  );

  return {
    create,
    isLoading,
    error,
  };
}
