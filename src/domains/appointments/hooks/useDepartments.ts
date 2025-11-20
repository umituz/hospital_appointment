import { useState, useEffect } from 'react';
import { DepartmentRepository } from '../infrastructure/repositories';
import { Department } from '../types';

export function useDepartments(hospitalId: string | number | undefined) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new DepartmentRepository();

  useEffect(() => {
    if (!hospitalId) {
      setIsLoading(false);
      return;
    }

    const fetchDepartments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await repository.getByHospitalId(hospitalId);
        setDepartments(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch departments'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, [hospitalId]);

  return {
    departments,
    isLoading,
    error,
  };
}

