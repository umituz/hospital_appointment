import { useState, useCallback } from "react";
import { useStorage } from "@umituz/react-native-storage";
import { DoctorFormData, Doctor } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import { DoctorValidationService } from "../utils/validation";

const STORAGE_KEY = "@hospital_appointment:doctors";

export function useCreateDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const { getItem, setItem } = useStorage();

  const create = useCallback(
    async (data: DoctorFormData) => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate data
        const validation = DoctorValidationService.validateFormData(data, t);
        if (!validation.isValid) {
          throw new Error(validation.errors.join(", "));
        }

        // Get existing doctors
        const doctors = await getItem<Doctor[]>(STORAGE_KEY, []);

        // Create new doctor
        const newDoctor: Doctor = {
          ...data,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Save to storage
        doctors.push(newDoctor);
        const success = await setItem(STORAGE_KEY, doctors);

        if (!success) {
          throw new Error("Failed to save doctor");
        }

        return true;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to create doctor");
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
