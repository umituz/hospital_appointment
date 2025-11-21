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
import { useDoctors, useDoctorSearch } from "@/domains/doctors";
import {
  DoctorCard,
  DoctorSearchBar,
  DoctorFilterChips,
} from "@/domains/doctors/presentation/components";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";

export const DoctorsScreen: React.FC = () => {
  const navigation = useNavigation();
  const tokens = useAppDesignTokens();
  const { doctors, isLoading, refetch } = useDoctors();
  const {
    searchQuery,
    setSearchQuery,
    selectedSpecialty,
    setSelectedSpecialty,
    selectedHospital,
    setSelectedHospital,
    filteredDoctors,
    specialties,
    hasActiveFilters,
  } = useDoctorSearch(doctors);

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

  const handleViewProfile = (doctorId: string) => {
    AppNavigation.navigate("EditDoctor", { doctorId });
  };

  const handleBookNow = (doctorId: string) => {
    AppNavigation.navigate("EditDoctor", { doctorId });
  };

  const renderItem = ({ item }: { item: (typeof filteredDoctors)[0] }) => (
    <DoctorCard
      doctor={item}
      onViewProfile={() => handleViewProfile(item.id)}
      onBookNow={() => handleBookNow(item.id)}
    />
  );

  const renderHeader = () => (
    <View>
      <DoctorSearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <DoctorFilterChips
        specialties={specialties}
        selectedSpecialty={selectedSpecialty}
        onSpecialtySelect={setSelectedSpecialty}
        selectedHospital={selectedHospital}
        onHospitalSelect={setSelectedHospital}
        onAvailableTodayPress={() => {
          /* TODO: Implement available today filter */
        }}
      />
    </View>
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
        <FlatList
          data={filteredDoctors}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <EmptyState
              icon="Search"
              title="doctors.search.noResults"
              description="doctors.search.noResultsDescription"
            />
          }
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
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
    paddingTop: 0,
  },
});

export default DoctorsScreen;
