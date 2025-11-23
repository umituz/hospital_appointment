import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout } from "@umituz/react-native-design-system";
import { AtomicFab } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import { useDoctorsList, useDoctorNavigation } from "@/domains/doctors";
import {
  DoctorsListHeader,
  FilterIndicator,
} from "@/domains/doctors/presentation/components";
import { LoadingState } from "@/components/common/LoadingState";
import { DoctorsSearchAndFilters } from "./components/DoctorsSearchAndFilters";
import { DoctorsList } from "./components/DoctorsList";

export const DoctorsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const { navigateToCreate, navigateToEdit, navigateToDetail } =
    useDoctorNavigation();

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
    handleDelete,
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
        <DoctorsSearchAndFilters
          query={query}
          setQuery={setQuery}
          specialtyFilterVisible={specialtyFilterVisible}
          hospitalFilterVisible={hospitalFilterVisible}
          specialtyOptions={specialtyOptions}
          hospitalOptions={hospitalOptions}
          selectedSpecialty={selectedSpecialty}
          selectedHospital={selectedHospital}
          onSpecialtySelect={handleSpecialtySelect}
          onHospitalSelect={handleHospitalSelect}
          onSpecialtyFilterClose={closeSpecialtyFilter}
          onHospitalFilterClose={closeHospitalFilter}
          onClearSpecialtyFilters={handleClearSpecialty}
          onClearHospitalFilters={handleClearHospital}
        />

        {hasActiveFilter && (
          <FilterIndicator
            filterLabels={filterLabels}
            onClear={handleClearAllFilters}
          />
        )}

        <DoctorsList
          doctors={doctors}
          isLoading={isLoading}
          refetch={refetch}
          onEditProfile={navigateToEdit}
          onShowDetails={navigateToDetail}
          onDelete={handleDelete}
        />

        <AtomicFab
          icon="Plus"
          onPress={navigateToCreate}
          variant="primary"
          size="md"
          testID="create-doctor-fab"
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
    paddingTop: 0,
  },
});

export default DoctorsScreen;
