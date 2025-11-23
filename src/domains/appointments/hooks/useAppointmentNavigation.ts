import { useCallback } from "react";
import { AppNavigation } from "@umituz/react-native-navigation";

export function useAppointmentNavigation() {
  const navigateToCreate = useCallback(() => {
    AppNavigation.navigate("CreateAppointment");
  }, []);

  const navigateToEdit = useCallback((appointmentId: string) => {
    AppNavigation.navigate("EditAppointment", { appointmentId });
  }, []);

  const navigateToDetail = useCallback((appointmentId: string) => {
    AppNavigation.navigate("AppointmentDetail", { appointmentId });
  }, []);

  return {
    navigateToCreate,
    navigateToEdit,
    navigateToDetail,
  };
}
