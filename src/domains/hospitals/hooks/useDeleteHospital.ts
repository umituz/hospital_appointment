import { useState, useCallback, useMemo } from "react";
import { useHospitalsStore } from "@/core/stores";
import {
  DeleteHospitalUseCase,
  DeleteHospitalInput,
} from "../application/use-cases";
import { HospitalRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useDeleteHospital() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { removeHospital } = useHospitalsStore();

  const useCase = useMemo(
    () => new DeleteHospitalUseCase(new HospitalRepository(storageService)),
    [],
  );

  const remove = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        const input: DeleteHospitalInput = {
          id,
        };

        const result = await useCase.execute(input);

        if (!result.success) {
          throw new Error("Failed to delete hospital");
        }

        // Remove from Zustand store for immediate UI update
        removeHospital(id);

        return true;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to delete hospital");
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [useCase, removeHospital],
  );

  return {
    deleteHospital: remove,
    isLoading,
    error,
  };
}
