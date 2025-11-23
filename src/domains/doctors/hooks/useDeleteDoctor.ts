import { useState, useCallback, useMemo } from "react";
import { useDoctorsStore } from "@/core/stores";
import {
  DeleteDoctorUseCase,
  DeleteDoctorInput,
} from "../application/use-cases";
import { DoctorRepository } from "../infrastructure/repositories";

export function useDeleteDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { removeDoctor } = useDoctorsStore();

  const useCase = useMemo(
    () => new DeleteDoctorUseCase(new DoctorRepository()),
    [],
  );

  const remove = useCallback(
    async (id: string): Promise<boolean> => {
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

        // Remove from Zustand store for immediate UI update
        removeDoctor(id);

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
    [useCase, removeDoctor],
  );

  return {
    deleteDoctor: remove,
    isLoading,
    error,
  };
}
