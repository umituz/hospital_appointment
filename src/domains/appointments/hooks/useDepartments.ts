import { useState, useEffect, useMemo } from "react";
import { DepartmentRepository } from "../infrastructure/repositories";
import { Department } from "../types";

export function useDepartments(hospitalId?: string | number | undefined) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = useMemo(() => new DepartmentRepository(), []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = hospitalId
          ? await repository.getByHospitalId(hospitalId)
          : await repository.getAll();
        setDepartments(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch departments"),
        );
        setDepartments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, [hospitalId, repository]);

  return {
    departments,
    isLoading,
    error,
  };
}
