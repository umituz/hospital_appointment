/**
 * Randevu Detayı - hospital_appointment
 * View detailed information about an appointment
 */

import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  ScreenLayout,
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import { useRoute } from "@react-navigation/native";
import { useAppointment } from "@/domains/appointments";
import { AppointmentInfoCard } from "@/domains/appointments/presentation/components/AppointmentInfoCard";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";

interface AppointmentDetailScreenParams {
  appointmentId: string;
}

export const AppointmentDetailScreen: React.FC = () => {
  const route = useRoute();
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { appointmentId } =
    (route.params as AppointmentDetailScreenParams) || {};
  const { appointment, isLoading, error } = useAppointment(appointmentId);

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingState icon="Calendar" />
      </ScreenLayout>
    );
  }

  if (error || !appointment) {
    return (
      <ScreenLayout>
        <EmptyState
          icon="Calendar"
          title="appointments.empty.title"
          description="appointments.empty.description"
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <AtomicCard variant="elevated" padding="lg" style={styles.card}>
          <AtomicText type="headlineMedium" color="textPrimary">
            {appointment.hospital_name || t("appointments.fields.hospital")}
          </AtomicText>
          <AtomicText
            type="bodyLarge"
            color="textSecondary"
            style={styles.subtitle}
          >
            {appointment.doctor_name || t("appointments.fields.doctor")}
          </AtomicText>
          <AtomicText type="bodyMedium" color="textSecondary">
            {appointment.department_name || t("appointments.fields.department")}
          </AtomicText>
        </AtomicCard>

        <AppointmentInfoCard appointment={appointment} />

        {appointment.notes && (
          <AtomicCard variant="elevated" padding="lg" style={styles.card}>
            <AtomicText
              type="titleMedium"
              color="textPrimary"
              style={styles.notesTitle}
            >
              {t("appointments.fields.notes")}
            </AtomicText>
            <AtomicText type="bodyMedium" color="textSecondary">
              {appointment.notes}
            </AtomicText>
          </AtomicCard>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 8,
  },
  notesTitle: {
    marginBottom: 8,
  },
});

export default AppointmentDetailScreen;
