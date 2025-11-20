import { useState, useCallback } from 'react';
import { DoctorService } from '../infrastructure/services';
import { DoctorFormData } from '../types';
import { useLocalization } from '@umituz/react-native-localization';

export function useCreateDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const service = new DoctorService();

  const create = useCallback(
    async (data: DoctorFormData) => {
      try {
        setIsLoading(true);
        setError(null);
        await service.createDoctor(data, t);
        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create doctor');
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

