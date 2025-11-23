import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import { useHospital } from "./useHospital";
import { useUpdateHospital } from "./useUpdateHospital";
import { useHospitalForm } from "./useHospitalForm";

export function useEditHospitalForm(hospitalId: string | undefined) {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const { hospital, isLoading: hospitalLoading } = useHospital(hospitalId);
  const { update, isLoading, error } = useUpdateHospital();
  const { formData, updateFormData } = useHospitalForm(hospital || undefined);

  const handleSubmit = useCallback(async () => {
    if (!hospitalId) {
      Alert.alert(
        t("general.error") || "Error",
        t("hospitals.errors.idRequired") || "Hospital ID is required",
      );
      return;
    }

    const success = await update(hospitalId, formData);
    if (success) {
      Alert.alert(
        t("general.success") || "Success",
        t("hospitals.messages.updated") || "Hospital updated successfully",
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
        error.message ||
          t("hospitals.errors.updateFailed") ||
          "Failed to update hospital",
      );
    }
  }, [update, hospitalId, formData, error, t, navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    hospital,
    isLoading: hospitalLoading,
    formData,
    updateFormData,
    isLoadingSubmit: isLoading,
    error,
    handleSubmit,
    handleCancel,
  };
}
