import { useState, useEffect } from "react";
import { DoctorRepository } from "../../doctors/infrastructure/repositories";
import { Doctor } from "../../doctors/types";

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new DoctorRepository();

  useEffect(() => {
    console.log("🔍 useDoctors Debug: Fetching all doctors");

    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("🔄 useDoctors: Fetching all doctors...");

        // Get all doctors without filtering
        const allDoctors = await repository.getAll();
        console.log(
          "📊 useDoctors: All doctors from repository:",
          allDoctors.length,
          allDoctors.map((d) => ({
            id: d.id,
            name: d.name,
            specialty: d.specialty,
            hospital_id: d.hospital_id,
            department_id: d.department_id,
          })),
        );

        setDoctors(allDoctors);
        console.log("✅ useDoctors: All doctors loaded successfully");
      } catch (err) {
        console.error("❌ useDoctors: Error fetching doctors:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to fetch doctors"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return {
    doctors,
    isLoading,
    error,
  };
}
