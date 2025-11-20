import { useState, useCallback } from 'react';
import { AppointmentService } from '../infrastructure/services';

export function useDeleteAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new AppointmentService();

  const remove = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await service.deleteAppointment(id);
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete appointment');
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

