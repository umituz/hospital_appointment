import { useState, useCallback, useMemo } from "react";
import {
  DeleteDoctorUseCase,
  DeleteDoctorInput,
} from "../application/use-cases";
import { DoctorRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useDeleteDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const useCase = useMemo(
    () => new DeleteDoctorUseCase(new DoctorRepository()),
    [],
  );

  const remove = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const input: DeleteDoctorInput = {
          id,
        };

        const result = await useCase.execute(input);

        if (!result.success) {
          throw new Error("Failed to delete doctor");
        }

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
    [useCase],
  );

  return {
    deleteDoctor: remove,
    isLoading,
    error,
  };
}
