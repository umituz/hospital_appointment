import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicButton,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface AppointmentFormActionsProps {
  isLoading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel?: string;
}

export const AppointmentFormActions: React.FC<AppointmentFormActionsProps> = ({
  isLoading,
  onSubmit,
  onCancel,
  submitLabel,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View
      style={[styles.container, { backgroundColor: tokens.colors.surface }]}
    >
      <AtomicButton
        variant="primary"
        onPress={onSubmit}
        disabled={isLoading}
        style={styles.submitButton}
      >
        {isLoading
          ? t("general.loading") || "Loading..."
          : submitLabel || t("appointments.create.submit") || "Save"}
      </AtomicButton>
      <AtomicButton
        variant="outline"
        onPress={onCancel}
        disabled={isLoading}
        style={styles.cancelButton}
      >
        {t("general.cancel") || "Cancel"}
      </AtomicButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  submitButton: {
    marginBottom: 8,
  },
  cancelButton: {},
});
