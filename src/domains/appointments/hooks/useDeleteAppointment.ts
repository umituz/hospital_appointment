import { useState, useCallback, useMemo } from "react";
import {
  DeleteAppointmentUseCase,
  DeleteAppointmentInput,
} from "../application/use-cases";
import { AppointmentRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useDeleteAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const useCase = useMemo(
    () =>
      new DeleteAppointmentUseCase(new AppointmentRepository(storageService)),
    [],
  );

  const deleteAppointment = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const input: DeleteAppointmentInput = {
          id,
        };

        const result = await useCase.execute(input);

        if (!result.success) {
          throw new Error("Failed to delete appointment");
        }

        return true;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to delete appointment");
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [useCase],
  );

  return {
    deleteAppointment,
    isLoading,
    error,
  };
}
