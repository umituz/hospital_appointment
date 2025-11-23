import React, { useLayoutEffect, useCallback } from "react";
import { View, StyleSheet, Alert, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout } from "@umituz/react-native-design-system";
import { AtomicFab } from "@umituz/react-native-design-system-atoms";
import { InfiniteScrollList } from "@umituz/react-native-infinite-scroll";
import { useLocalization } from "@umituz/react-native-localization";
import {
  useAppointments,
  useAppointmentNavigation,
  useDeleteAppointment,
} from "@/domains/appointments";
import { AppointmentCard } from "@/domains/appointments/presentation/components/AppointmentCard";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import {
  getAppointmentsPage,
  hasMoreAppointments,
} from "@/domains/appointments/utils/pagination";
import type { Appointment } from "@/domains/appointments/types";

export const AppointmentsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const { navigateToCreate, navigateToEdit, navigateToDetail } =
    useAppointmentNavigation();
  const { appointments, isLoading, refetch } = useAppointments();
  const { deleteAppointment } = useDeleteAppointment();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
    });
  }, [navigation]);

  const handleDeleteAppointment = useCallback(
    (id: string) => {
      Alert.alert(
        t("general.delete") || "Delete",
        t("appointments.deleteConfirm") ||
          "Are you sure you want to delete this appointment?",
        [
          {
            text: t("general.cancel") || "Cancel",
            style: "cancel",
          },
          {
            text: t("general.delete") || "Delete",
            style: "destructive",
            onPress: async () => {
              const success = await deleteAppointment(id);
              if (success) {
                Alert.alert(
                  t("general.success") || "Success",
                  t("appointments.messages.deleted") ||
                    "Appointment deleted successfully",
                );
                refetch();
              } else {
                Alert.alert(
                  t("general.error") || "Error",
                  t("appointments.errors.deleteFailed") ||
                    "Failed to delete appointment",
                );
              }
            },
          },
        ],
      );
    },
    [deleteAppointment, refetch, t],
  );

  const fetchAppointmentsPage = async (
    page: number,
    pageSize: number,
  ): Promise<Appointment[]> => {
    if (!appointments.length && isLoading) {
      await refetch();
    }
    return getAppointmentsPage(appointments, page, pageSize);
  };

  const renderItem = (appointment: Appointment) => (
    <AppointmentCard
      appointment={appointment}
      onShowDetails={() => navigateToDetail(appointment.id)}
      onEdit={() => navigateToEdit(appointment.id)}
      onDelete={() => handleDeleteAppointment(appointment.id)}
    />
  );

  if (isLoading && appointments.length === 0) {
    return (
      <ScreenLayout scrollable={false}>
        <View style={styles.container}>
          <LoadingState icon="Calendar" />
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout scrollable={false}>
      <View style={styles.container}>
        <InfiniteScrollList
          config={{
            pageSize: 20,
            threshold: 5,
            fetchData: fetchAppointmentsPage,
            getItemKey: (appointment) => appointment.id,
            hasMore: (lastPage: Appointment[], allPages: Appointment[][]) => {
              const loadedAppointments = allPages.flat();
              return hasMoreAppointments(appointments, loadedAppointments);
            },
          }}
          renderItem={renderItem}
          emptyComponent={
            <EmptyState
              icon="Calendar"
              title="appointments.empty.title"
              description="appointments.empty.description"
            />
          }
          flatListProps={{
            contentContainerStyle: styles.list,
            showsVerticalScrollIndicator: false,
            refreshControl: (
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            ),
          }}
        />

        <AtomicFab
          icon="Plus"
          onPress={navigateToCreate}
          variant="primary"
          size="md"
          testID="create-appointment-fab"
        />
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
