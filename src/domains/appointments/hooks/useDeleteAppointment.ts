import { useState, useCallback } from "react";
import { useStorage } from "@umituz/react-native-storage";
import { Appointment } from "../types";

const STORAGE_KEY = "@hospital_appointment:appointments";

export function useDeleteAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { getItem, setItem } = useStorage();

  const deleteAppointment = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);

        // Get existing appointments
        const appointments = await getItem<Appointment[]>(STORAGE_KEY, []);

        // Find and remove appointment
        const filteredAppointments = appointments.filter((a) => a.id !== id);

        if (filteredAppointments.length === appointments.length) {
          throw new Error("Appointment not found");
        }

        // Save to storage
        const success = await setItem(STORAGE_KEY, filteredAppointments);

        if (!success) {
          throw new Error("Failed to delete appointment");
        }

        return true;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to delete appointment");
        setError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [getItem, setItem],
  );

  return {
    deleteAppointment,
    isLoading,
    error,
  };
}
