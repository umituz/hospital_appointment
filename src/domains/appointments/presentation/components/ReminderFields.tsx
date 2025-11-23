import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface ReminderFieldsProps {
  reminderEnabled: boolean;
  reminderTime: number;
  onUpdateField: (
    field: "reminder_enabled" | "reminder_time",
    value: boolean | number,
  ) => void;
}

export const ReminderFields: React.FC<ReminderFieldsProps> = ({
  reminderEnabled,
  reminderTime,
  onUpdateField,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={styles.input}>
      <View style={styles.reminderHeader}>
        <AtomicIcon name="Bell" size="md" color="primary" />
        <AtomicText
          type="bodyMedium"
          color="textPrimary"
          style={styles.reminderLabel}
        >
          {t("appointments.fields.reminder")}
        </AtomicText>
        <TouchableOpacity
          onPress={() => onUpdateField("reminder_enabled", !reminderEnabled)}
          style={[
            styles.toggle,
            {
              backgroundColor: reminderEnabled
                ? tokens.colors.primary
                : tokens.colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.toggleThumb,
              {
                backgroundColor: tokens.colors.surface,
                transform: [{ translateX: reminderEnabled ? 20 : 0 }],
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      {reminderEnabled && (
        <View style={styles.reminderOptions}>
          {[15, 30, 60, 120].map((minutes) => (
            <TouchableOpacity
              key={minutes}
              onPress={() => onUpdateField("reminder_time", minutes)}
              style={[
                styles.reminderOption,
                {
                  backgroundColor:
                    reminderTime === minutes
                      ? tokens.colors.primary
                      : tokens.colors.surface,
                  borderColor: tokens.colors.border,
                },
              ]}
            >
              <AtomicText
                type="bodySmall"
                color={
                  reminderTime === minutes ? "textOnPrimary" : "textPrimary"
                }
              >
                {minutes} {t("appointments.detail.minutesBefore")}
              </AtomicText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  reminderLabel: {
    flex: 1,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  reminderOptions: {
    flexDirection: "row",
    gap: 8,
  },
  reminderOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
});
