import { useState, useCallback } from 'react';
import { AppointmentService } from '../infrastructure/services';
import { AppointmentFormData } from '../types';
import { useLocalization } from '@umituz/react-native-localization';

export function useCreateAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const service = new AppointmentService();

  const create = useCallback(
    async (data: AppointmentFormData) => {
      try {
        setIsLoading(true);
        setError(null);
        await service.createAppointment(data, t);
        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create appointment');
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  return {
    create,
    isLoading,
    error,
  };
}

