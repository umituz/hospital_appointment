import { useCallback } from "react";
import { AppNavigation } from "@umituz/react-native-navigation";

export function useDoctorNavigation() {
  const navigateToCreate = useCallback(() => {
    AppNavigation.navigate("CreateDoctor");
  }, []);

  const navigateToEdit = useCallback((doctorId: string) => {
    AppNavigation.navigate("EditDoctor", { doctorId });
  }, []);

  const navigateToDetail = useCallback((doctorId: string) => {
    AppNavigation.navigate("DoctorDetail", { doctorId });
  }, []);

  return {
    navigateToCreate,
    navigateToEdit,
    navigateToDetail,
  };
}
