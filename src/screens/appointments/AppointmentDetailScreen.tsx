/**
 * Randevu Detayı - hospital_appointment
 * View detailed information about an appointment
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ScreenLayout, AtomicText, useAppDesignTokens } from '@umituz/react-native-design-system';
import { AtomicCard } from '@umituz/react-native-design-system-atoms';
import { useLocalization } from '@umituz/react-native-localization';
import { useAppointment } from '@/domains/appointments';

interface AppointmentDetailScreenProps {
  appointmentId?: string;
}

export const AppointmentDetailScreen: React.FC<AppointmentDetailScreenProps> = ({ appointmentId }) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { appointment, isLoading, error } = useAppointment(appointmentId);

  if (isLoading) {
    return (
      <ScreenLayout>
        <AtomicCard variant="flat" padding="lg" style={styles.container}>
          <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary }}>
            {t('general.loading')}
          </AtomicText>
        </AtomicCard>
      </ScreenLayout>
    );
  }

  if (error || !appointment) {
    return (
      <ScreenLayout>
        <AtomicCard variant="flat" padding="lg" style={styles.container}>
          <AtomicText type="headlineSmall" style={{ color: tokens.colors.textSecondary }}>
            {t('appointments.empty.title')}
          </AtomicText>
        </AtomicCard>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <AtomicCard variant="elevated" padding="lg" style={styles.card}>
          <AtomicText type="headlineMedium" style={{ color: tokens.colors.textPrimary }}>
            {appointment.hospital_name || t('appointments.fields.hospital')}
          </AtomicText>
          <AtomicText type="bodyLarge" style={{ color: tokens.colors.textSecondary, marginTop: 8 }}>
            {appointment.doctor_name || t('appointments.fields.doctor')}
          </AtomicText>
          <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
            {appointment.department_name || t('appointments.fields.department')}
          </AtomicText>
        </AtomicCard>

        <AtomicCard variant="elevated" padding="lg" style={styles.card}>
          <AtomicText type="titleMedium" style={{ color: tokens.colors.textPrimary, marginBottom: 8 }}>
            {t('appointments.fields.date')}
          </AtomicText>
          <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary }}>
            {t('appointments.fields.date')}: {appointment.appointment_date}
          </AtomicText>
          <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
            {t('appointments.fields.time')}: {appointment.appointment_time}
          </AtomicText>
          {appointment.patient_name && (
            <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
              {t('appointments.fields.patientName')}: {appointment.patient_name}
            </AtomicText>
          )}
        </AtomicCard>

        {appointment.notes && (
          <AtomicCard variant="elevated" padding="lg" style={styles.card}>
            <AtomicText type="titleMedium" style={{ color: tokens.colors.textPrimary, marginBottom: 8 }}>
              {t('appointments.fields.notes')}
            </AtomicText>
            <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary }}>
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
    padding: 16,
  },
});

export default AppointmentDetailScreen;

