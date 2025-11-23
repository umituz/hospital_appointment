import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import { useAppointment } from "./useAppointment";
import { useUpdateAppointment } from "./useUpdateAppointment";
import { useAppointmentForm } from "./useAppointmentForm";

export function useEditAppointmentForm(appointmentId: string | undefined) {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const {
    appointment,
    isLoading: appointmentLoading,
    refetch,
  } = useAppointment(appointmentId);
  const { update, isLoading, error } = useUpdateAppointment();
  const {
    formData,
    updateFormData,
    showHospitalPicker,
    setShowHospitalPicker,
    showDepartmentPicker,
    setShowDepartmentPicker,
    showDoctorPicker,
    setShowDoctorPicker,
    handleDateChange,
    handleTimeChange,
  } = useAppointmentForm(appointment || undefined);

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
    if (!appointmentId) {
      Alert.alert(t("general.error"), t("appointments.errors.idRequired"));
      return;
    }

    const success = await update(appointmentId, formData);
    if (success) {
      Alert.alert(t("general.success"), t("appointments.messages.updated"), [
        {
          text: t("general.ok"),
          onPress: () => {
            refetch();
            navigation.goBack();
          },
        },
      ]);
    } else if (error) {
      Alert.alert(
        t("general.error"),
        error.message || t("appointments.errors.updateFailed"),
      );
    }
  }, [update, appointmentId, formData, error, t, navigation, refetch]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    appointment,
    isLoading: appointmentLoading,
    formData,
    updateFormData,
    isLoadingSubmit: isLoading,
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
