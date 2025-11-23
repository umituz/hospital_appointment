import { useState, useEffect, useMemo, useCallback } from "react";
import { AppointmentRepository } from "../infrastructure/repositories";
import { Appointment } from "../types";

export function useAppointment(id: string | undefined) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = useMemo(() => new AppointmentRepository(), []);

  const fetchAppointment = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await repository.getById(id);
      setAppointment(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch appointment"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [id, repository]);

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
