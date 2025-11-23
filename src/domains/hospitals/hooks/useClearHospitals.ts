import { useCallback } from "react";
import { HospitalRepository } from "../infrastructure/repositories";

export function useClearHospitals() {
  const repository = new HospitalRepository();

  const clearAll = useCallback(async () => {
    await repository.clearAll();
  }, []);

  return {
    clearAll,
  };
}
