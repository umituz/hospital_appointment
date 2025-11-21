import { useState, useEffect, useMemo, useCallback } from 'react';
import { HospitalRepository } from '../infrastructure/repositories';
import { Hospital } from '../types';

export function useHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize repository to prevent recreation on every render
  const repository = useMemo(() => new HospitalRepository(), []);

  // Memoize fetch function to prevent infinite loops
  const fetchHospitals = useCallback(async () => {
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
  }, [repository]);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  return {
    hospitals,
    isLoading,
    error,
    refetch: fetchHospitals,
  };
}

