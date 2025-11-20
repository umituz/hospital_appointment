import { useState, useCallback } from 'react';
import { DoctorService } from '../infrastructure/services';

export function useDeleteDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new DoctorService();

  const remove = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await service.deleteDoctor(id);
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete doctor');
      setError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    remove,
    isLoading,
    error,
  };
}

