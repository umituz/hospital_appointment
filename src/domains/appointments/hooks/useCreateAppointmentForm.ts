import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import { useCreateAppointment } from "./useCreateAppointment";
import { useAppointmentForm } from "./useAppointmentForm";

export function useCreateAppointmentForm() {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const { create, isLoading, error } = useCreateAppointment();
  const {
    formData,
    updateFormData,
    resetForm,
    showHospitalPicker,
    setShowHospitalPicker,
    showDepartmentPicker,
    setShowDepartmentPicker,
    showDoctorPicker,
    setShowDoctorPicker,
    handleDateChange,
    handleTimeChange,
  } = useAppointmentForm();

  const onSelectHospital = useCallback(
    (hospitalId: string) => {
      updateFormData("hospital_id", hospitalId);
    },
    [updateFormData],
  );

  const onSelectDepartment = useCallback(
    (departmentId: string) => {
      updateFormData("department_id", departmentId);
    },
    [updateFormData],
  );

  const onSelectDoctor = useCallback(
    (doctorId: string) => {
      updateFormData("doctor_id", doctorId);
    },
    [updateFormData],
  );

  const handleSubmit = useCallback(async () => {
    const success = await create(formData);
    if (success) {
      Alert.alert(t("general.success"), t("appointments.messages.created"), [
        {
          text: t("general.ok"),
          onPress: () => {
            resetForm();
            navigation.goBack();
          },
        },
      ]);
    } else if (error) {
      Alert.alert(
        t("general.error"),
        error.message || t("appointments.errors.createFailed"),
      );
    }
  }, [create, formData, error, t, navigation, resetForm]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    formData,
    updateFormData,
    isLoading,
    error,
    handleSubmit,
    handleCancel,
    showHospitalPicker,
    setShowHospitalPicker,
    showDepartmentPicker,
    setShowDepartmentPicker,
    showDoctorPicker,
    setShowDoctorPicker,
    onSelectHospital,
    onSelectDepartment,
    onSelectDoctor,
    handleDateChange,
    handleTimeChange,
  };
}
