import { useState, useCallback } from 'react';
import { HospitalService } from '../infrastructure/services';

export function useDeleteHospital() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new HospitalService();

  const remove = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await service.deleteHospital(id);
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete hospital');
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

