import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import { useDoctor } from "./useDoctor";
import { useUpdateDoctor } from "./useUpdateDoctor";
import { useDoctorForm } from "./useDoctorForm";
import { useDepartments } from "@/domains/appointments";

export function useEditDoctorForm(doctorId: string | undefined) {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const { doctor, isLoading: doctorLoading } = useDoctor(doctorId);
  const { update, isLoading, error } = useUpdateDoctor();
  const { formData, updateFormData } = useDoctorForm(doctor || undefined);
  const { departments } = useDepartments(undefined);
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);

  const handleSelectDepartment = useCallback(
    (departmentId: string) => {
      updateFormData("department_id", departmentId);
      setShowDepartmentPicker(false);
    },
    [updateFormData],
  );

  const handleSubmit = useCallback(async () => {
    if (!doctorId) {
      Alert.alert(
        t("general.error") || "Error",
        t("doctors.errors.idRequired"),
      );
      return;
    }

    const success = await update(doctorId, formData);
    if (success) {
      Alert.alert(
        t("general.success") || "Success",
        t("doctors.messages.updated") || "Doctor updated successfully",
        [
          {
            text: t("general.ok") || "OK",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } else if (error) {
      Alert.alert(
        t("general.error") || "Error",
        error.message || t("doctors.errors.updateFailed"),
      );
    }
  }, [update, doctorId, formData, error, t, navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const toggleDepartmentPicker = useCallback(() => {
    setShowDepartmentPicker((prev) => !prev);
  }, []);

  const closeDepartmentPicker = useCallback(() => {
    setShowDepartmentPicker(false);
  }, []);

  return {
    doctor,
    isLoading: doctorLoading,
    formData,
    updateFormData,
    departments,
    showDepartmentPicker,
    isLoadingSubmit: isLoading,
    error,
    handleSelectDepartment,
    handleSubmit,
    handleCancel,
    toggleDepartmentPicker,
    closeDepartmentPicker,
  };
}
