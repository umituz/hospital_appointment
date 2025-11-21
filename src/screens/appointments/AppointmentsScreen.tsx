import React, { useLayoutEffect } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenLayout, AtomicIcon, useAppDesignTokens } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';
import { useAppointments } from '@/domains/appointments';
import { AppointmentCard } from '@/domains/appointments/presentation/components/AppointmentCard';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';

export const AppointmentsScreen: React.FC = () => {
  const navigation = useNavigation();
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { appointments, isLoading, refetch } = useAppointments();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // TODO: Navigate to create appointment form
            /* eslint-disable-next-line no-console */
            if (__DEV__) console.log('Create appointment');
          }}
          style={{ marginRight: 16 }}
        >
          <AtomicIcon name="Plus" size="lg" color="primary" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleRefresh = async () => {
    await refetch();
  };

  const renderItem = ({ item }: { item: typeof appointments[0] }) => (
    <AppointmentCard appointment={item} />
  );

  if (isLoading && appointments.length === 0) {
    return (
      <ScreenLayout>
        <View style={styles.container}>
          <LoadingState icon="Calendar" />
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <View style={styles.container}>
        {appointments.length === 0 ? (
          <EmptyState
            icon="Calendar"
            title="appointments.empty.title"
            description="appointments.empty.description"
          />
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
});

export default AppointmentsScreen;

