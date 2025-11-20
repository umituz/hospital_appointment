import React from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { ScreenLayout, AtomicText, AtomicIcon, useAppDesignTokens } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';
import { useAppointments } from '@/domains/appointments';

export const AppointmentsScreen: React.FC = () => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { appointments, isLoading, refetch } = useAppointments();

  const handleRefresh = async () => {
    await refetch();
  };

  const renderItem = ({ item }: { item: typeof appointments[0] }) => (
    <View style={[styles.card, { backgroundColor: tokens.colors.surface }]}>
      <AtomicText type="headlineSmall" style={{ color: tokens.colors.textPrimary }}>
        {item.hospital_name || t('appointments.fields.hospital')}
      </AtomicText>
      <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
        {item.doctor_name || t('appointments.fields.doctor')} - {item.department_name || t('appointments.fields.department')}
      </AtomicText>
      <AtomicText type="bodySmall" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
        {item.appointment_date} {item.appointment_time}
      </AtomicText>
    </View>
  );

  if (isLoading && appointments.length === 0) {
    return (
      <ScreenLayout>
        <View style={styles.container}>
          <View style={styles.emptyState}>
            <AtomicIcon name="Calendar" size="xxl" color="secondary" />
            <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 16 }}>
              {t('general.loading')}
            </AtomicText>
          </View>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <View style={styles.container}>
        {appointments.length === 0 ? (
          <View style={styles.emptyState}>
            <AtomicIcon name="Calendar" size="xxl" color="secondary" />
            <AtomicText type="headlineSmall" style={{ color: tokens.colors.textSecondary, marginTop: 16 }}>
              {t('appointments.empty.title')}
            </AtomicText>
            <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 8 }}>
              {t('appointments.empty.description')}
            </AtomicText>
          </View>
        ) : (
          <FlatList
            data={appointments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
            }
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
});

export default AppointmentsScreen;

