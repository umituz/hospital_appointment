import { useCallback } from "react";
import { HospitalRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";

export function useClearHospitals() {
  const repository = new HospitalRepository(storageService);

  const clearAll = useCallback(async () => {
    await repository.clearAll();
  }, []);

  return {
    clearAll,
  };
}
