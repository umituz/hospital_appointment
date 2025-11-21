import React, { useLayoutEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ScreenLayout,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { AppNavigation } from "@umituz/react-native-navigation";
import { useDoctors } from "@/domains/doctors";
import { DoctorCard } from "@/domains/doctors/presentation/components/DoctorCard";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";

export const DoctorsScreen: React.FC = () => {
  const navigation = useNavigation();
  const tokens = useAppDesignTokens();
  const { doctors, isLoading, refetch } = useDoctors();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            AppNavigation.navigate("CreateDoctor");
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

  const renderItem = ({ item }: { item: (typeof doctors)[0] }) => (
    <DoctorCard
      doctor={item}
      onPress={() => {
        AppNavigation.navigate("EditDoctor", { doctorId: item.id });
      }}
    />
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
