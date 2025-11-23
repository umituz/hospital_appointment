import { useState, useEffect, useCallback, useMemo } from "react";
import { Appointment } from "../types";
import {
  GetAppointmentUseCase,
  GetAppointmentInput,
} from "../application/use-cases";
import { AppointmentRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useAppointment(id: string | undefined) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const useCase = useMemo(
    () => new GetAppointmentUseCase(new AppointmentRepository(storageService)),
    [],
  );

  const fetchAppointment = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const input: GetAppointmentInput = {
        id,
      };

      const result = await useCase.execute(input);

      if (!result.success) {
        throw new Error("Failed to fetch appointment");
      }

      setAppointment(result.appointment);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch appointment"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [id, useCase]);

  useEffect(() => {
    fetchAppointment();
  }, [fetchAppointment]);

  return {
    appointment,
    isLoading,
    error,
    refetch: fetchAppointment,
  };
}
