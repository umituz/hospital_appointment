import { useState, useCallback, useMemo } from "react";
import { DoctorService } from "../infrastructure/services";
import { useLocalization } from "@umituz/react-native-localization";

export function useDeleteDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const service = useMemo(() => new DoctorService(), []);

  const remove = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await service.deleteDoctor(id, t);
        return true;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to delete doctor");
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [service, t],
  );

  return {
    deleteDoctor: remove,
    isLoading,
    error,
  };
}
