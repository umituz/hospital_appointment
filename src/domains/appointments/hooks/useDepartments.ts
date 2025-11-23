import { useState, useEffect, useMemo } from "react";
import { DepartmentRepository } from "../infrastructure/repositories";
import { Department } from "../types";

export function useDepartments(hospitalId?: string) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = useMemo(() => new DepartmentRepository(), []);

  useEffect(() => {
    console.log("🏥 useDepartments Debug:", {
      hospitalId,
      hasHospitalId: !!hospitalId,
    });

    const fetchDepartments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = hospitalId
          ? await repository.getByHospitalId(hospitalId)
          : await repository.getAll();

        console.log(
          "📋 useDepartments: Fetched departments:",
          data?.length || 0,
          data?.map((d) => ({
            id: d.id,
            name: d.name,
            hospital_id: d.hospital_id,
          })),
        );

        setDepartments(data || []);
      } catch (err) {
        console.error("❌ useDepartments: Error fetching departments:", err);
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
