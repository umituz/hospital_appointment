import { useState, useEffect } from "react";
import { HospitalRepository } from "../../hospitals/infrastructure/repositories";
import { Hospital } from "../../hospitals/types";
import { storageService } from "../../storage/infrastructure/services";

export function useHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new HospitalRepository(storageService);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await repository.getAll();
        setHospitals(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch hospitals"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return {
    hospitals,
    isLoading,
    error,
  };
}
