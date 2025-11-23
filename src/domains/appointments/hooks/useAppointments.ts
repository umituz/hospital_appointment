import { useState, useEffect, useCallback } from "react";
import { useStorage } from "@umituz/react-native-storage";
import { Appointment } from "../types";

const STORAGE_KEY = "@hospital_appointment:appointments";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getItem } = useStorage();

  // Memoize fetch function to prevent infinite loops
  const fetchAppointments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getItem<Appointment[]>(STORAGE_KEY, []);
      setAppointments(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch appointments"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [getItem]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    isLoading,
    error,
    refetch: fetchAppointments,
  };
}
