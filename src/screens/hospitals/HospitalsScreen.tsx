import React from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import {
  ScreenLayout,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useHospitals } from "@/domains/hospitals";
import { HospitalCard } from "@/domains/hospitals/presentation/components/HospitalCard";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";

export const HospitalsScreen: React.FC = () => {
  const tokens = useAppDesignTokens();
  const { hospitals, isLoading, refetch } = useHospitals();

  const handleRefresh = async () => {
    await refetch();
  };

  const renderItem = ({ item }: { item: (typeof hospitals)[0] }) => (
    <HospitalCard hospital={item} />
  );

  if (isLoading && hospitals.length === 0) {
    return (
      <ScreenLayout scrollable={false}>
        <View style={styles.container}>
          <LoadingState icon="Building2" />
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout scrollable={false}>
      <View style={styles.container}>
        {hospitals.length === 0 ? (
          <EmptyState
            icon="Building2"
            title="hospitals.empty.title"
            description="hospitals.empty.description"
          />
        ) : (
          <FlatList
            data={hospitals}
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

export default HospitalsScreen;
