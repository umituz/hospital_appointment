import { useState, useEffect } from "react";
import { DoctorRepository } from "../../doctors/infrastructure/repositories";
import { Doctor } from "../../doctors/types";

export function useDoctors(departmentId?: string, hospitalId?: string) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new DoctorRepository();

  useEffect(() => {
    if (!departmentId || !hospitalId) {
      setDoctors([]);
      setIsLoading(false);
      return;
    }

    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Get all doctors and filter by both hospital and department
        const allDoctors = await repository.getAll();
        const filteredDoctors = allDoctors.filter(
          (doctor) =>
            doctor.department_id === departmentId &&
            doctor.hospital_id === hospitalId,
        );
        setDoctors(filteredDoctors);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch doctors"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [departmentId, hospitalId]);

  return {
    doctors,
    isLoading,
    error,
  };
}
