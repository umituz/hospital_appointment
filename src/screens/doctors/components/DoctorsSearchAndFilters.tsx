import React from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar } from "@umituz/react-native-search";
import { FilterSheet } from "@umituz/react-native-filter";
import { useLocalization } from "@umituz/react-native-localization";

interface DoctorsSearchAndFiltersProps {
  query: string;
  setQuery: (query: string) => void;
  specialtyFilterVisible: boolean;
  hospitalFilterVisible: boolean;
  specialtyOptions: Array<{ id: string; label: string }>;
  hospitalOptions: Array<{ id: string; label: string }>;
  selectedSpecialty: string | null;
  selectedHospital: string | null;
  onSpecialtySelect: (id: string) => void;
  onHospitalSelect: (id: string) => void;
  onSpecialtyFilterClose: () => void;
  onHospitalFilterClose: () => void;
  onClearSpecialtyFilters: () => void;
  onClearHospitalFilters: () => void;
}

export const DoctorsSearchAndFilters: React.FC<
  DoctorsSearchAndFiltersProps
> = ({
  query,
  setQuery,
  specialtyFilterVisible,
  hospitalFilterVisible,
  specialtyOptions,
  hospitalOptions,
  selectedSpecialty,
  selectedHospital,
  onSpecialtySelect,
  onHospitalSelect,
  onSpecialtyFilterClose,
  onHospitalFilterClose,
  onClearSpecialtyFilters,
  onClearHospitalFilters,
}) => {
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder={t("doctors.search.placeholder") || "Search doctors..."}
      />

      <FilterSheet
        visible={specialtyFilterVisible}
        title={t("doctors.filters.specialty") || "Specialty"}
        options={specialtyOptions}
        selectedIds={selectedSpecialty ? [selectedSpecialty] : []}
        onFilterPress={onSpecialtySelect}
        onClose={onSpecialtyFilterClose}
        onClearFilters={onClearSpecialtyFilters}
      />

      <FilterSheet
        visible={hospitalFilterVisible}
        title={t("doctors.filters.hospital") || "Hospital"}
        options={hospitalOptions}
        selectedIds={selectedHospital ? [selectedHospital] : []}
        onFilterPress={onHospitalSelect}
        onClose={onHospitalFilterClose}
        onClearFilters={onClearHospitalFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
