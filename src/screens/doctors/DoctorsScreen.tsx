import React, { useLayoutEffect, useMemo } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout } from "@umituz/react-native-design-system";
import { AtomicFab } from "@umituz/react-native-design-system-atoms";
import { SearchBar } from "@umituz/react-native-search";
import { FilterSheet } from "@umituz/react-native-filter";
import { InfiniteScrollList } from "@umituz/react-native-infinite-scroll";
import { useLocalization } from "@umituz/react-native-localization";
import {
  useDoctorsList,
  useDoctorNavigation,
  useDeleteDoctor,
} from "@/domains/doctors";
import {
  getDoctorsPage,
  hasMoreDoctors,
} from "@/domains/doctors/utils/pagination";
import {
  DoctorCard,
  DoctorsListHeader,
  FilterIndicator,
} from "@/domains/doctors/presentation/components";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import type { Doctor } from "@/domains/doctors/types";

export const DoctorsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const { navigateToCreate, navigateToEdit, navigateToDetail } =
    useDoctorNavigation();
  const { deleteDoctor } = useDeleteDoctor();

  const {
    doctors,
    isLoading,
    refetch,
    query,
    setQuery,
    selectedSpecialty,
    selectedHospital,
    specialtyFilterVisible,
    hospitalFilterVisible,
    specialtyOptions,
    hospitalOptions,
    filterLabels,
    hasActiveFilter,
    openSpecialtyFilter,
    closeSpecialtyFilter,
    openHospitalFilter,
    closeHospitalFilter,
    handleSpecialtySelect,
    handleHospitalSelect,
    handleClearSpecialty,
    handleClearHospital,
    handleClearAllFilters,
  } = useDoctorsList();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DoctorsListHeader
          hasActiveFilter={hasActiveFilter}
          onSpecialtyPress={openSpecialtyFilter}
          onHospitalPress={openHospitalFilter}
          onFilterPress={() => {
            if (specialtyOptions.length > 0) {
              openSpecialtyFilter();
            } else if (hospitalOptions.length > 0) {
              openHospitalFilter();
            }
          }}
        />
      ),
    });
  }, [
    navigation,
    hasActiveFilter,
    specialtyOptions.length,
    hospitalOptions.length,
    openSpecialtyFilter,
    openHospitalFilter,
  ]);

  const handleDelete = async (doctorId: string) => {
    Alert.alert(
      t("general.confirm") || "Confirm",
      t("doctors.messages.deleteConfirm") ||
        "Are you sure you want to delete this doctor?",
      [
        {
          text: t("general.cancel") || "Cancel",
          style: "cancel",
        },
        {
          text: t("general.delete") || "Delete",
          style: "destructive",
          onPress: async () => {
            const success = await deleteDoctor(doctorId);
            if (success) {
              await refetch();
            }
          },
        },
      ],
    );
  };

  const fetchDoctorsPage = async (
    page: number,
    pageSize: number,
  ): Promise<Doctor[]> => {
    if (!doctors.length && isLoading) {
      await refetch();
    }
    return getDoctorsPage(doctors, page, pageSize);
  };

  const renderItem = (doctor: Doctor) => (
    <DoctorCard
      doctor={doctor}
      onEditProfile={() => navigateToEdit(doctor.id)}
      onShowDetails={() => navigateToDetail(doctor.id)}
      onDelete={() => handleDelete(doctor.id)}
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

  const listHeader = (
    <View style={styles.headerContainer}>
      <View style={styles.searchWrapper}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={
            t("doctors.search.placeholder") || "Search by name, specialty..."
          }
          style={styles.searchBar}
        />
      </View>

      {hasActiveFilter && (
        <FilterIndicator
          filterLabels={filterLabels}
          onClear={handleClearAllFilters}
        />
      )}
    </View>
  );

  return (
    <ScreenLayout scrollable={false}>
      <View style={styles.container}>
        <InfiniteScrollList
          key={`${selectedSpecialty}-${selectedHospital}-${query}`}
          config={{
            pageSize: 20,
            threshold: 5,
            fetchData: fetchDoctorsPage,
            getItemKey: (doctor) => doctor.id,
            hasMore: (lastPage: Doctor[], allPages: Doctor[][]) => {
              const loadedDoctors = allPages.flat();
              return hasMoreDoctors(doctors, loadedDoctors);
            },
          }}
          renderItem={renderItem}
          emptyComponent={
            <EmptyState
              icon="Search"
              title="doctors.search.noResults"
              description="doctors.search.noResultsDescription"
            />
          }
          ListHeaderComponent={listHeader}
          flatListProps={{
            contentContainerStyle: styles.list,
            showsVerticalScrollIndicator: false,
          }}
        />

        <AtomicFab
          icon="Plus"
          onPress={navigateToCreate}
          variant="primary"
          size="md"
          testID="create-doctor-fab"
        />

        <FilterSheet
          visible={specialtyFilterVisible}
          options={specialtyOptions}
          selectedIds={selectedSpecialty ? [selectedSpecialty] : []}
          onFilterPress={handleSpecialtySelect}
          onClearFilters={handleClearSpecialty}
          onClose={closeSpecialtyFilter}
          title={t("doctors.filters.specialization") || "Specialization"}
        />

        <FilterSheet
          visible={hospitalFilterVisible}
          options={hospitalOptions}
          selectedIds={selectedHospital ? [selectedHospital] : []}
          onFilterPress={handleHospitalSelect}
          onClearFilters={handleClearHospital}
          onClose={closeHospitalFilter}
          title={t("doctors.filters.hospital") || "Hospital"}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBar: {
    borderRadius: 16,
    elevation: 0,
    shadowOpacity: 0,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
});

export default DoctorsScreen;
