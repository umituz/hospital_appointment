import React, { useState, useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  AtomicButton,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import {
  FilterSheet,
  useListFilters,
  type FilterOption,
} from "@umituz/react-native-filter";
import { useLocalization } from "@umituz/react-native-localization";
import { Department } from "@/domains/appointments/types";

interface DoctorFilterChipsProps {
  specialties: string[];
  selectedSpecialty: string | null;
  onSpecialtySelect: (specialty: string | null) => void;
  selectedHospital: string | null;
  onHospitalSelect: (hospital: string | null) => void;
  onAvailableTodayPress: () => void;
  departments?: Department[];
}

export const DoctorFilterChips: React.FC<DoctorFilterChipsProps> = ({
  specialties,
  selectedSpecialty,
  onSpecialtySelect,
  selectedHospital,
  onHospitalSelect,
  onAvailableTodayPress,
  departments = [],
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const [specialtyFilterVisible, setSpecialtyFilterVisible] = useState(false);
  const [hospitalFilterVisible, setHospitalFilterVisible] = useState(false);

  const specialtyOptions: FilterOption[] = useMemo(
    () =>
      specialties.map((specialty) => ({
        id: specialty,
        label: specialty,
      })),
    [specialties],
  );

  const hospitalOptions: FilterOption[] = useMemo(
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
  } = useListFilters({
    options: specialtyOptions,
    defaultFilterId: "",
    singleSelect: true,
  });

  const {
    selectedIds: selectedHospitalIds,
    handleFilterPress: handleHospitalFilterPress,
    handleClearFilters: handleClearHospitalFilters,
  } = useListFilters({
    options: hospitalOptions,
    defaultFilterId: "",
    singleSelect: true,
  });

  const handleSpecialtySelect = (filterId: string) => {
    handleSpecialtyFilterPress(filterId);
    onSpecialtySelect(filterId || null);
    setSpecialtyFilterVisible(false);
  };

  const handleHospitalSelect = (filterId: string) => {
    handleHospitalFilterPress(filterId);
    onHospitalSelect(filterId || null);
    setHospitalFilterVisible(false);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: tokens.colors.backgroundPrimary },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.chipContainer}>
            <AtomicButton
              variant={selectedSpecialty ? "primary" : "outline"}
              size="sm"
              onPress={() => setSpecialtyFilterVisible(true)}
              style={styles.chip}
            >
              {t("doctors.filters.specialization") || "Specialization"}
            </AtomicButton>
            <View style={styles.iconContainer}>
              <AtomicIcon name="ChevronDown" size="sm" color="secondary" />
            </View>
          </View>

          <View style={styles.chipContainer}>
            <AtomicButton
              variant={selectedHospital ? "primary" : "outline"}
              size="sm"
              onPress={() => setHospitalFilterVisible(true)}
              style={styles.chip}
            >
              {t("doctors.filters.hospital") || "Hospital"}
            </AtomicButton>
            <View style={styles.iconContainer}>
              <AtomicIcon name="ChevronDown" size="sm" color="secondary" />
            </View>
          </View>

          <View style={styles.chipContainer}>
            <AtomicButton
              variant="outline"
              size="sm"
              onPress={onAvailableTodayPress}
              style={styles.chip}
            >
              {t("doctors.filters.availableToday") || "Available Today"}
            </AtomicButton>
            <View style={styles.iconContainer}>
              <AtomicIcon name="ChevronDown" size="sm" color="secondary" />
            </View>
          </View>
        </ScrollView>
      </View>

      <FilterSheet
        visible={specialtyFilterVisible}
        options={specialtyOptions}
        selectedIds={selectedSpecialty ? [selectedSpecialty] : []}
        onFilterPress={handleSpecialtySelect}
        onClearFilters={() => {
          handleClearSpecialtyFilters();
          onSpecialtySelect(null);
          setSpecialtyFilterVisible(false);
        }}
        onClose={() => setSpecialtyFilterVisible(false)}
        title={t("doctors.filters.specialization") || "Specialization"}
      />

      <FilterSheet
        visible={hospitalFilterVisible}
        options={hospitalOptions}
        selectedIds={selectedHospital ? [selectedHospital] : []}
        onFilterPress={handleHospitalSelect}
        onClearFilters={() => {
          handleClearHospitalFilters();
          onHospitalSelect(null);
          setHospitalFilterVisible(false);
        }}
        onClose={() => setHospitalFilterVisible(false)}
        title={t("doctors.filters.hospital") || "Hospital"}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  chip: {
    marginRight: 0,
    paddingRight: 32,
  },
  iconContainer: {
    position: "absolute",
    right: 12,
    zIndex: 1,
  },
});
