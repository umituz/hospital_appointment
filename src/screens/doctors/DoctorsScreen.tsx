import React, { useMemo, useLayoutEffect, useState } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout } from "@umituz/react-native-design-system";
import { AtomicFab } from "@umituz/react-native-design-system-atoms";
import { SearchBar, useSearch } from "@umituz/react-native-search";
import { FilterSheet, useListFilters } from "@umituz/react-native-filter";
import { useLocalization } from "@umituz/react-native-localization";
import { useDoctors, useDoctorNavigation } from "@/domains/doctors";
import {
  DoctorCard,
  DoctorsListHeader,
  FilterIndicator,
} from "@/domains/doctors/presentation/components";
import { useDepartments } from "@/domains/appointments";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingState } from "@/components/common/LoadingState";
import type { Doctor } from "@/domains/doctors/types";
import type { Department } from "@/domains/appointments/types";

export const DoctorsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const { doctors, isLoading, refetch } = useDoctors();
  const { departments } = useDepartments(undefined);
  const { navigateToCreate, navigateToEdit, navigateToDetail } =
    useDoctorNavigation();

  const [specialtyFilterVisible, setSpecialtyFilterVisible] = useState(false);
  const [hospitalFilterVisible, setHospitalFilterVisible] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  const { query, setQuery, debouncedQuery } = useSearch({
    debounceMs: 300,
  });

  const specialties = useMemo(() => {
    const unique = new Set(doctors.map((d) => d.specialty).filter(Boolean));
    return Array.from(unique).sort();
  }, [doctors]);

  const specialtyOptions = useMemo(
    () =>
      specialties.map((specialty) => ({
        id: specialty,
        label: specialty,
      })),
    [specialties],
  );

  const hospitalOptions = useMemo(
    () =>
      departments.map((dept) => ({
        id: dept.id.toString(),
        label: dept.name,
      })),
    [departments],
  );

  const {
    selectedIds: selectedSpecialtyIds,
    handleFilterPress: handleSpecialtyFilterPress,
    handleClearFilters: handleClearSpecialtyFilters,
    activeFilter: activeSpecialtyFilter,
  } = useListFilters({
    options: specialtyOptions,
    defaultFilterId: "",
    singleSelect: true,
  });

  const {
    selectedIds: selectedHospitalIds,
    handleFilterPress: handleHospitalFilterPress,
    handleClearFilters: handleClearHospitalFilters,
    activeFilter: activeHospitalFilter,
  } = useListFilters({
    options: hospitalOptions,
    defaultFilterId: "",
    singleSelect: true,
  });

  const filteredDoctors = useMemo(() => {
    let filtered = doctors;

    if (debouncedQuery.trim()) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.specialty?.toLowerCase().includes(query),
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === selectedSpecialty,
      );
    }

    if (selectedHospital) {
      filtered = filtered.filter(
        (doctor) => doctor.department_id === selectedHospital,
      );
    }

    return filtered;
  }, [doctors, debouncedQuery, selectedSpecialty, selectedHospital]);

  const handleSpecialtySelect = (filterId: string) => {
    handleSpecialtyFilterPress(filterId);
    setSelectedSpecialty(filterId || null);
    setSpecialtyFilterVisible(false);
  };

  const handleHospitalSelect = (filterId: string) => {
    handleHospitalFilterPress(filterId);
    setSelectedHospital(filterId || null);
    setHospitalFilterVisible(false);
  };

  const handleClearFilters = () => {
    handleClearSpecialtyFilters();
    handleClearHospitalFilters();
    setSelectedSpecialty(null);
    setSelectedHospital(null);
    setQuery("");
  };

  const hasActiveFilter =
    selectedSpecialty !== null ||
    selectedHospital !== null ||
    query.trim() !== "";

  const filterLabels = useMemo(() => {
    const labels: string[] = [];
    if (selectedSpecialty) {
      labels.push(selectedSpecialty);
    }
    if (selectedHospital) {
      const dept = departments.find(
        (d) => d.id.toString() === selectedHospital,
      );
      if (dept) {
        labels.push(dept.name);
      }
    }
    return labels;
  }, [selectedSpecialty, selectedHospital, departments]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DoctorsListHeader
          hasActiveFilter={hasActiveFilter}
          onSpecialtyPress={() => setSpecialtyFilterVisible(true)}
          onHospitalPress={() => setHospitalFilterVisible(true)}
          onFilterPress={() => {
            if (specialtyOptions.length > 0) {
              setSpecialtyFilterVisible(true);
            } else if (hospitalOptions.length > 0) {
              setHospitalFilterVisible(true);
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
  ]);

  const handleRefresh = async () => {
    await refetch();
  };

  const renderItem = ({ item }: { item: Doctor }) => (
    <DoctorCard
      doctor={item}
      onEditProfile={() => navigateToEdit(item.id)}
      onShowDetails={() => navigateToDetail(item.id)}
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
        <View style={styles.searchContainer}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder={
              t("doctors.search.placeholder") || "Search by name, specialty..."
            }
          />
        </View>

        {hasActiveFilter && (
          <FilterIndicator
            filterLabels={filterLabels}
            onClear={handleClearFilters}
          />
        )}

        <FlatList
          data={filteredDoctors}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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

        <AtomicFab
          icon="Plus"
          onPress={navigateToCreate}
          variant="primary"
          size="md"
          testID="create-doctor-fab"
        />

        <FilterSheet
          visible={specialtyFilterVisible}
          options={specialtyOptions.map((opt) => ({
            ...opt,
            icon: "Stethoscope" as const,
          }))}
          selectedIds={selectedSpecialty ? [selectedSpecialty] : []}
          onFilterPress={handleSpecialtySelect}
          onClearFilters={() => {
            handleClearSpecialtyFilters();
            setSelectedSpecialty(null);
            setSpecialtyFilterVisible(false);
          }}
          onClose={() => setSpecialtyFilterVisible(false)}
          title={t("doctors.filters.specialization") || "Specialization"}
        />

        <FilterSheet
          visible={hospitalFilterVisible}
          options={hospitalOptions.map((opt) => ({
            ...opt,
            icon: "Building" as const,
          }))}
          selectedIds={selectedHospital ? [selectedHospital] : []}
          onFilterPress={handleHospitalSelect}
          onClearFilters={() => {
            handleClearHospitalFilters();
            setSelectedHospital(null);
            setHospitalFilterVisible(false);
          }}
          onClose={() => setHospitalFilterVisible(false)}
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
});

export default DoctorsScreen;
