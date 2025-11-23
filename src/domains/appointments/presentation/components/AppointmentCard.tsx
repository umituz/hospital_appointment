import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicButton,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import {
  SwipeableItem,
  useSwipeActions,
} from "@umituz/react-native-swipe-actions";
import { useTimezone } from "@umituz/react-native-timezone";
import { Appointment } from "../../types";

interface AppointmentCardProps {
  appointment: Appointment;
  onShowDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onShowDetails,
  onEdit,
  onDelete,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { formatDate } = useTimezone();
  const { createDeleteAction, createEditAction } = useSwipeActions();

  const rightActions = [];
  if (onDelete) {
    rightActions.push(createDeleteAction(onDelete));
  }
  if (onEdit) {
    rightActions.push(createEditAction(onEdit));
  }

  const cardContent = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: tokens.colors.surface,
          borderColor: tokens.colors.borderLight,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: tokens.colors.primaryLight },
            ]}
          >
            <AtomicIcon name="Calendar" size="xl" color="primary" />
          </View>
        </View>

        <View style={styles.info}>
          <AtomicText
            type="headlineSmall"
            color="textPrimary"
            style={styles.hospitalName}
          >
            {appointment.hospital_name || t("appointments.fields.hospital")}
          </AtomicText>
          <AtomicText
            type="bodyLarge"
            color="textSecondary"
            style={styles.doctorName}
          >
            {appointment.doctor_name || t("appointments.fields.doctor")}
          </AtomicText>
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.department}
          >
            {appointment.department_name || t("appointments.fields.department")}
          </AtomicText>
          <AtomicText
            type="bodySmall"
            color="textSecondary"
            style={styles.datetime}
          >
            {appointment.appointment_date} {appointment.appointment_time}
          </AtomicText>
          {appointment.created_at && (
            <AtomicText
              type="bodySmall"
              color="textSecondary"
              style={styles.date}
            >
              {t("general.createdAt") || "Created At"}:{" "}
              {formatDate(new Date(appointment.created_at))}
            </AtomicText>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <AtomicButton
          variant="outline"
          size="md"
          onPress={onShowDetails || (() => {})}
          style={styles.actionButton}
        >
          {t("appointments.card.showDetails") || "Show Details"}
        </AtomicButton>
        <AtomicButton
          variant="primary"
          size="md"
          onPress={onEdit || (() => {})}
          style={styles.actionButton}
        >
          {t("appointments.card.edit") || "Edit"}
        </AtomicButton>
      </View>
    </View>
  );

  if (rightActions.length > 0) {
    return (
      <SwipeableItem rightActions={rightActions}>{cardContent}</SwipeableItem>
    );
  }

  return cardContent;
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  hospitalName: {
    marginTop: 0,
  },
  doctorName: {
    marginTop: 4,
  },
  department: {
    marginTop: 4,
  },
  datetime: {
    marginTop: 8,
  },
  date: {
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
});
