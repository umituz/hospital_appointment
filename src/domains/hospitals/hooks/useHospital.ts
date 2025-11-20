import { useState, useEffect } from 'react';
import { HospitalRepository } from '../infrastructure/repositories';
import { Hospital } from '../types';

export function useHospital(id: string | undefined) {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new HospitalRepository();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchHospital = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await repository.getById(id);
        setHospital(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch hospital'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospital();
  }, [id]);

  return {
    hospital,
    isLoading,
    error,
  };
}

