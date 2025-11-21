import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText, useAppDesignTokens } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';
import { Appointment } from '../../types';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onPress }) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  const content = (
    <View style={[styles.card, { backgroundColor: tokens.colors.surface }]}>
      <AtomicText type="headlineSmall" style={{ color: tokens.colors.textPrimary }}>
        {appointment.hospital_name || t('appointments.fields.hospital')}
      </AtomicText>
      <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
        {appointment.doctor_name || t('appointments.fields.doctor')} - {appointment.department_name || t('appointments.fields.department')}
      </AtomicText>
      <AtomicText type="bodySmall" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
        {appointment.appointment_date} {appointment.appointment_time}
      </AtomicText>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
});

