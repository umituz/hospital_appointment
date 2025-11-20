import { useState, useEffect } from 'react';
import { DoctorRepository } from '../infrastructure/repositories';
import { Doctor } from '../types';

export function useDoctorsByDepartment(departmentId: string | number | undefined) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new DoctorRepository();

  useEffect(() => {
    if (!departmentId) {
      setIsLoading(false);
      return;
    }

    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await repository.getByDepartmentId(departmentId);
        setDoctors(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch doctors'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [departmentId]);

  return {
    doctors,
    isLoading,
    error,
  };
}

