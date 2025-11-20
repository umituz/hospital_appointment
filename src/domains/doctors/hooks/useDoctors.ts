import { useState, useEffect } from 'react';
import { DoctorRepository } from '../infrastructure/repositories';
import { Doctor } from '../types';

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new DoctorRepository();

  const fetchDoctors = async () => {
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
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return {
    doctors,
    isLoading,
    error,
    refetch: fetchDoctors,
  };
}

