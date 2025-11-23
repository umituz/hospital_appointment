import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import type { Appointment } from "../../types";
import { AppointmentFormattingService } from "../../utils/formatting";
import { AppointmentInfoItem } from "./AppointmentInfoItem";

interface AppointmentInfoCardProps {
  appointment: Appointment;
}

export const AppointmentInfoCard: React.FC<AppointmentInfoCardProps> = ({
  appointment,
}) => {
  const { t, currentLanguage } = useLocalization();

  const locale = currentLanguage || "en-US";

  return (
    <View style={styles.container}>
      <AtomicCard style={styles.card}>
        <AtomicText
          type="headlineSmall"
          color="textPrimary"
          style={styles.title}
        >
          {t("appointments.detail.info.title")}
        </AtomicText>

        <AppointmentInfoItem
          icon="Calendar"
          value={AppointmentFormattingService.formatDate(
            appointment.appointment_date,
            locale,
          )}
          label={t("appointments.fields.date")}
        />

        <AppointmentInfoItem
          icon="Clock"
          value={AppointmentFormattingService.formatTime(
            appointment.appointment_time,
            locale,
          )}
          label={t("appointments.fields.time")}
        />

        <AppointmentInfoItem
          icon="User"
          value={appointment.patient_name}
          label={t("appointments.fields.patientName")}
        />
      </AtomicCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    padding: 20,
  },
  title: {
    marginBottom: 16,
  },
});
