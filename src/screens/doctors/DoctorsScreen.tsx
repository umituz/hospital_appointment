import React from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import {
  ScreenLayout,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useDoctors } from "@/domains/doctors";
import { DoctorCard } from "@/domains/doctors/presentation/components/DoctorCard";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";

export const DoctorsScreen: React.FC = () => {
  const tokens = useAppDesignTokens();
  const { doctors, isLoading, refetch } = useDoctors();

  const handleRefresh = async () => {
    await refetch();
  };

  const renderItem = ({ item }: { item: (typeof doctors)[0] }) => (
    <DoctorCard doctor={item} />
  );

  if (isLoading && doctors.length === 0) {
    return (
      <ScreenLayout scrollable={false}>
        <View style={styles.container}>
          <LoadingState icon="User" />
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout scrollable={false}>
      <View style={styles.container}>
        {doctors.length === 0 ? (
          <EmptyState
            icon="User"
            title="doctors.empty.title"
            description="doctors.empty.description"
          />
        ) : (
          <FlatList
            data={doctors}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={handleRefresh}
              />
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

export default DoctorsScreen;
