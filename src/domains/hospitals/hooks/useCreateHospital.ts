import { useState, useCallback } from "react";
import { useStorage } from "@umituz/react-native-storage";
import { HospitalFormData, Hospital } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import { HospitalValidationService } from "../utils/validation";

const STORAGE_KEY = "@hospital_appointment:hospitals";
const MIGRATION_FLAG_KEY = "@hospital_appointment:hospitals_migrated";
const OLD_MOCK_HOSPITAL_IDS = ["1", "2", "3", "4"];

export function useCreateHospital() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const { getItem, setItem } = useStorage();

  const create = useCallback(
    async (data: HospitalFormData) => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate data
        const validation = HospitalValidationService.validateFormData(data, t);
        if (!validation.isValid) {
          throw new Error(validation.errors.join(", "));
        }

        // Check migration and clear old mock data if needed
        const migrated = await getItem<boolean>(MIGRATION_FLAG_KEY, false);
        let hospitals = await getItem<Hospital[]>(STORAGE_KEY, []);

        if (!migrated) {
          const hasOldMockData = hospitals.some((h) =>
            OLD_MOCK_HOSPITAL_IDS.includes(h.id),
          );
          if (hasOldMockData) {
            hospitals = [];
            await setItem(STORAGE_KEY, hospitals);
            await setItem(MIGRATION_FLAG_KEY, true);
          }
        }

        // Create new hospital
        const newHospital: Hospital = {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Save to storage
        hospitals.push(newHospital);
        const success = await setItem(STORAGE_KEY, hospitals);

        if (!success) {
          throw new Error("Failed to save hospital");
        }

        return true;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to create hospital");
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t, getItem, setItem],
  );

  return {
    create,
    isLoading,
    error,
  };
}
