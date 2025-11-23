import { useCallback } from "react";
import { DoctorsStateActions } from "./useDoctorsState";

export interface UseDoctorsErrorReturn {
  handleError: (error: unknown, context: string) => Error;
  clearError: () => void;
  createError: (message: string) => Error;
}

export function useDoctorsError(
  actions: DoctorsStateActions,
): UseDoctorsErrorReturn {
  const handleError = useCallback(
    (error: unknown, context: string): Error => {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error(`${context}: ${String(error)}`);

      actions.setError(normalizedError);
      return normalizedError;
    },
    [actions],
  );

  const clearError = useCallback(() => {
    actions.setError(null);
  }, [actions]);

  const createError = useCallback((message: string): Error => {
    return new Error(message);
  }, []);

  return {
    handleError,
    clearError,
    createError,
  };
}
