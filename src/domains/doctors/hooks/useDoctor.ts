import { useState, useEffect } from "react";
import { DoctorRepository } from "../infrastructure/repositories";
import { Doctor } from "../types";
import { storageService } from "../../storage/infrastructure/services";

export function useDoctor(id: string | undefined) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new DoctorRepository(storageService);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setDoctor(null);
      setError(null);
      return;
    }

    const fetchDoctor = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await repository.getById(id);
        setDoctor(data);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to fetch doctor");
        setError(error);
        setDoctor(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, [id, repository]);

  return {
    doctor,
    isLoading,
    error,
  };
}
