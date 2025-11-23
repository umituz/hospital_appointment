import { useCallback } from "react";
import { AppNavigation } from "@umituz/react-native-navigation";

export function useHospitalNavigation() {
  const navigateToCreate = useCallback(() => {
    AppNavigation.navigate("CreateHospital");
  }, []);

  const navigateToEdit = useCallback((hospitalId: string) => {
    AppNavigation.navigate("EditHospital", { hospitalId });
  }, []);

  const navigateToDetail = useCallback((hospitalId: string) => {
    AppNavigation.navigate("HospitalDetail", { hospitalId });
  }, []);

  return {
    navigateToCreate,
    navigateToEdit,
    navigateToDetail,
  };
}
