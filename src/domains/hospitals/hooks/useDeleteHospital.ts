import { useState, useCallback, useMemo } from "react";
import {
  DeleteHospitalUseCase,
  DeleteHospitalInput,
} from "../application/use-cases";
import { HospitalRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useDeleteHospital() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const useCase = useMemo(
    () => new DeleteHospitalUseCase(new HospitalRepository(storageService)),
    [],
  );

  const remove = useCallback(
    async (id: string) => {
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
    [useCase],
  );

  return {
    deleteHospital: remove,
    isLoading,
    error,
  };
}
