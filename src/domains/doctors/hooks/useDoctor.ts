import { useState, useEffect } from 'react';
import { DoctorRepository } from '../infrastructure/repositories';
import { Doctor } from '../types';

export function useDoctor(id: string | undefined) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new DoctorRepository();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchDoctor = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await repository.getById(id);
        setDoctor(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch doctor'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  return {
    doctor,
    isLoading,
    error,
  };
}

