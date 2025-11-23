import { useEffect, useCallback, useMemo } from "react";
import { Alert } from "react-native";
import { useAppointmentsStore } from "@/core/stores";
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
  const {
    appointments,
    isLoading,
    error,
    setAppointments,
    setLoading,
    setError,
    removeAppointment,
  } = useAppointmentsStore();
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

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const input: GetAppointmentsInput = {};
      const result = await getAppointmentsUseCase.execute(input);

      if (!result.success) {
        throw new Error("Failed to fetch appointments");
      }

      setAppointments(result.appointments);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch appointments");
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [getAppointmentsUseCase, setAppointments, setLoading, setError]);

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
                  // Remove from Zustand store for immediate UI update
                  removeAppointment(id);
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
    [t, deleteAppointmentUseCase, removeAppointment],
  );

  useEffect(() => {
    // Only fetch if we don't have appointments in store
    if (appointments.length === 0) {
      fetchAppointments();
    }
  }, [appointments.length, fetchAppointments]);

  return {
    appointments,
    isLoading,
    error,
    refetch: fetchAppointments,
    handleDeleteAppointment,
  };
}
