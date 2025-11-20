import { useState, useCallback } from 'react';
import { HospitalService } from '../infrastructure/services';
import { HospitalFormData } from '../types';
import { useLocalization } from '@umituz/react-native-localization';

export function useCreateHospital() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const service = new HospitalService();

  const create = useCallback(
    async (data: HospitalFormData) => {
      try {
        setIsLoading(true);
        setError(null);
        await service.createHospital(data, t);
        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create hospital');
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

