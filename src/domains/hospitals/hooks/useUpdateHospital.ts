import { useState, useCallback } from 'react';
import { HospitalService } from '../infrastructure/services';
import { HospitalFormData } from '../types';
import { useLocalization } from '@umituz/react-native-localization';

export function useUpdateHospital() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const service = new HospitalService();

  const update = useCallback(
    async (id: string, data: Partial<HospitalFormData>) => {
      try {
        setIsLoading(true);
        setError(null);
        await service.updateHospital(id, data, t);
        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to update hospital');
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  return {
    update,
    isLoading,
    error,
  };
}

