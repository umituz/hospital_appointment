import { useState, useEffect, useCallback, useMemo } from "react";
import { Appointment } from "../types";
import {
  GetAppointmentsUseCase,
  GetAppointmentsInput,
} from "../application/use-cases";
import { AppointmentRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const useCase = useMemo(
    () => new GetAppointmentsUseCase(new AppointmentRepository(storageService)),
    [],
  );

  // Memoize fetch function to prevent infinite loops
  const fetchAppointments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const input: GetAppointmentsInput = {};
      const result = await useCase.execute(input);

      if (!result.success) {
        throw new Error("Failed to fetch appointments");
      }

      setAppointments(result.appointments);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch appointments"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [useCase]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    isLoading,
    error,
    refetch: fetchAppointments,
  };
}
