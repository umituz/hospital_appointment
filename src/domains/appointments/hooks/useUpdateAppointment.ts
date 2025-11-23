import { useState, useCallback, useMemo } from "react";
import { AppointmentService } from "../infrastructure/services";
import { AppointmentFormData } from "../types";
import { useLocalization } from "@umituz/react-native-localization";

export function useUpdateAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const service = useMemo(() => new AppointmentService(), []);

  const update = useCallback(
    async (id: string, data: AppointmentFormData) => {
      try {
        setIsLoading(true);
        setError(null);
        await service.updateAppointment(id, data, t);
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
    [service, t],
  );

  return {
    update,
    isLoading,
    error,
  };
}
