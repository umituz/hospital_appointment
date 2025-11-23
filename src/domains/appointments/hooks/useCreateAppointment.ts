import { useState, useCallback } from "react";
import { useStorage } from "@umituz/react-native-storage";
import { AppointmentFormData, Appointment } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import { AppointmentValidationService } from "../utils/validation";

const STORAGE_KEY = "@hospital_appointment:appointments";

export function useCreateAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const { getItem, setItem } = useStorage();

  const create = useCallback(
    async (data: AppointmentFormData) => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate data
        const validation = AppointmentValidationService.validateFormData(
          data,
          t,
        );
        if (!validation.isValid) {
          throw new Error(validation.errors.join(", "));
        }

        // Get existing appointments
        const appointments = await getItem<Appointment[]>(STORAGE_KEY, []);

        // Create new appointment
        const newAppointment: Appointment = {
          ...data,
          hospital_name: "", // Will be enriched by enrichment service if needed
          department_name: "",
          doctor_name: "",
          id: Date.now().toString(),
          status: "scheduled",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Save to storage
        appointments.push(newAppointment);
        const success = await setItem(STORAGE_KEY, appointments);

        if (!success) {
          throw new Error("Failed to save appointment");
        }

        return true;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to create appointment");
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
