import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface DateTimeFieldsProps {
  appointmentDate: string;
  appointmentTime: string;
  onDateSelect: () => void;
  onTimeSelect: () => void;
}

export const DateTimeFields: React.FC<DateTimeFieldsProps> = ({
  appointmentDate,
  appointmentTime,
  onDateSelect,
  onTimeSelect,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <>
      <View style={styles.input}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.label}
        >
          {t("appointments.fields.date")} *
        </AtomicText>
        <TouchableOpacity
          onPress={onDateSelect}
          style={[
            styles.pickerButton,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
          ]}
        >
          <AtomicIcon name="Calendar" size="md" color="primary" />
          <AtomicText
            type="bodyLarge"
            color={appointmentDate ? "textPrimary" : "textSecondary"}
            style={styles.pickerText}
          >
            {appointmentDate || t("appointments.placeholders.selectDate")}
          </AtomicText>
        </TouchableOpacity>
      </View>

      <View style={styles.input}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.label}
        >
          {t("appointments.fields.time")} *
        </AtomicText>
        <TouchableOpacity
          onPress={onTimeSelect}
          style={[
            styles.pickerButton,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
          ]}
        >
          <AtomicIcon name="Clock" size="md" color="primary" />
          <AtomicText
            type="bodyLarge"
            color={appointmentTime ? "textPrimary" : "textSecondary"}
            style={styles.pickerText}
          >
            {appointmentTime || t("appointments.placeholders.selectTime")}
          </AtomicText>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
    minHeight: 56,
  },
  pickerText: {
    flex: 1,
  },
});
