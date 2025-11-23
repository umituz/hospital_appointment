import { useState, useCallback } from "react";
import { useStorage } from "@umituz/react-native-storage";
import { AppointmentFormData, Appointment } from "../types";
import { useLocalization } from "@umituz/react-native-localization";
import { AppointmentValidationService } from "../utils/validation";

const STORAGE_KEY = "@hospital_appointment:appointments";

export function useUpdateAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();
  const { getItem, setItem } = useStorage();

  const update = useCallback(
    async (id: string, data: AppointmentFormData) => {
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

        // Find and update appointment
        const index = appointments.findIndex((a) => a.id === id);
        if (index === -1) {
          throw new Error("Appointment not found");
        }

        const updatedAppointment: Appointment = {
          ...appointments[index],
          ...data,
          hospital_name: "", // Will be enriched by enrichment service if needed
          department_name: "",
          doctor_name: "",
          id,
          updated_at: new Date().toISOString(),
        };

        appointments[index] = updatedAppointment;

        // Save to storage
        const success = await setItem(STORAGE_KEY, appointments);

        if (!success) {
          throw new Error("Failed to update appointment");
        }

        return true;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to update appointment");
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t, getItem, setItem],
  );

  return {
    update,
    isLoading,
    error,
  };
}
