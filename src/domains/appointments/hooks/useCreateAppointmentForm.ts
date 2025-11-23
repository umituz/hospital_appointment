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
    handleDateSelect,
    handleTimeSelect,
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

  const handleSelectHospital = useCallback(
    (hospitalId: string) => {
      onSelectHospital(hospitalId);
      updateFormData("department_id", "");
      updateFormData("doctor_id", "");
    },
    [onSelectHospital, updateFormData],
  );

  const handleSelectDepartment = useCallback(
    (departmentId: string) => {
      onSelectDepartment(departmentId);
      updateFormData("doctor_id", "");
    },
    [onSelectDepartment, updateFormData],
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
    handleSelectHospital,
    handleSelectDepartment,
    handleDateSelect,
    handleTimeSelect,
  };
}
