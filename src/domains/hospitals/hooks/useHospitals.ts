import { useState, useEffect } from 'react';
import { HospitalRepository } from '../infrastructure/repositories';
import { Hospital } from '../types';

export function useHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new HospitalRepository();

  const fetchHospitals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await repository.getAll();
      setHospitals(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch hospitals'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return {
    hospitals,
    isLoading,
    error,
    refetch: fetchHospitals,
  };
}

