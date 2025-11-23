import { useState, useCallback, useMemo } from "react";
import { AppointmentService } from "../infrastructure/services";

export function useDeleteAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = useMemo(() => new AppointmentService(), []);

  const deleteAppointment = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await service.deleteAppointment(id);
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
    [service],
  );

  return {
    deleteAppointment,
    isLoading,
    error,
  };
}
