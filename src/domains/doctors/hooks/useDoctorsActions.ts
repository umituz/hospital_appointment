import { useCallback } from "react";
import { Alert } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";
import { useDeleteDoctor } from "./useDeleteDoctor";

export interface UseDoctorsActionsProps {
  onSuccess: () => void;
}

export interface UseDoctorsActionsReturn {
  handleDelete: (doctorId: string) => void;
}

export function useDoctorsActions(
  onSuccess: () => void,
): UseDoctorsActionsReturn {
  const { t } = useLocalization();
  const { deleteDoctor } = useDeleteDoctor();

  const handleDelete = useCallback(
    (doctorId: string) => {
      Alert.alert(
        t("general.confirm") || "Confirm",
        t("doctors.messages.deleteConfirm") ||
          "Are you sure you want to delete this doctor?",
        [
          {
            text: t("general.cancel") || "Cancel",
            style: "cancel",
          },
          {
            text: t("general.delete") || "Delete",
            style: "destructive",
            onPress: async () => {
              const success = await deleteDoctor(doctorId);
              if (success) {
                Alert.alert(
                  t("general.success") || "Success",
                  t("doctors.messages.deleted") ||
                    "Doctor deleted successfully",
                );
                onSuccess();
              } else {
                Alert.alert(
                  t("general.error") || "Error",
                  t("doctors.errors.deleteFailed") || "Failed to delete doctor",
                );
              }
            },
          },
        ],
      );
    },
    [deleteDoctor, onSuccess, t],
  );

  return {
    handleDelete,
  };
}
