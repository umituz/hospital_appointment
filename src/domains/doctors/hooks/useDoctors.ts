import { useState, useEffect, useMemo, useCallback } from 'react';
import { DoctorRepository } from '../infrastructure/repositories';
import { Doctor } from '../types';

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize repository to prevent recreation on every render
  const repository = useMemo(() => new DoctorRepository(), []);

  // Memoize fetch function to prevent infinite loops
  const fetchDoctors = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await repository.getAll();
      setDoctors(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch doctors'));
    } finally {
      setIsLoading(false);
    }
  }, [repository]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
    isLoading,
    error,
    refetch: fetchDoctors,
  };
}

