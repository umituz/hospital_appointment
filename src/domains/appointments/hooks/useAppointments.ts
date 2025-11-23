import { useState, useEffect, useCallback, useMemo } from "react";
import { Alert } from "react-native";
import { Appointment } from "../types";
import {
  GetAppointmentsUseCase,
  GetAppointmentsInput,
  DeleteAppointmentUseCase,
  DeleteAppointmentInput,
} from "../application/use-cases";
import { AppointmentRepository } from "../infrastructure/repositories";
import { storageService } from "../../storage/infrastructure/services";
import { useLocalization } from "@umituz/react-native-localization";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useLocalization();

  const getAppointmentsUseCase = useMemo(
    () => new GetAppointmentsUseCase(new AppointmentRepository(storageService)),
    [],
  );

  const deleteAppointmentUseCase = useMemo(
    () =>
      new DeleteAppointmentUseCase(new AppointmentRepository(storageService)),
    [],
  );

  // Memoize fetch function to prevent infinite loops
  const fetchAppointments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const input: GetAppointmentsInput = {};
      const result = await getAppointmentsUseCase.execute(input);

      if (!result.success) {
        throw new Error("Failed to fetch appointments");
      }

      setAppointments(result.appointments);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch appointments"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [getAppointmentsUseCase]);

  const handleDeleteAppointment = useCallback(
    (id: string) => {
      Alert.alert(
        t("general.delete") || "Delete",
        t("appointments.deleteConfirm") ||
          "Are you sure you want to delete this appointment?",
        [
          {
            text: t("general.cancel") || "Cancel",
            style: "cancel",
          },
          {
            text: t("general.delete") || "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                const input: DeleteAppointmentInput = {
                  id,
                };

                const result = await deleteAppointmentUseCase.execute(input);

                if (result.success) {
                  Alert.alert(
                    t("general.success") || "Success",
                    t("appointments.messages.deleted") ||
                      "Appointment deleted successfully",
                  );
                  fetchAppointments(); // Refetch after successful deletion
                } else {
                  Alert.alert(
                    t("general.error") || "Error",
                    t("appointments.errors.deleteFailed") ||
                      "Failed to delete appointment",
                  );
                }
              } catch (error) {
                Alert.alert(
                  t("general.error") || "Error",
                  t("appointments.errors.deleteFailed") ||
                    "Failed to delete appointment",
                );
              }
            },
          },
        ],
      );
    },
    [t, deleteAppointmentUseCase, fetchAppointments],
  );

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    isLoading,
    error,
    refetch: fetchAppointments,
    handleDeleteAppointment,
  };
}
