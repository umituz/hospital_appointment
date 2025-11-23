import { useState, useEffect, useMemo, useCallback } from "react";
import { DoctorRepository } from "../infrastructure/repositories";
import { Doctor } from "../types";

export function useDoctorsByDepartment(departmentId?: string) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = useMemo(() => new DoctorRepository(), []);

  const fetchDoctors = useCallback(async () => {
    if (!departmentId) {
      setIsLoading(false);
      setDoctors([]);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await repository.getByDepartmentId(departmentId);
      setDoctors(data);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch doctors");
      setError(error);
      setDoctors([]);
    } finally {
      setIsLoading(false);
    }
  }, [departmentId, repository]);

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
