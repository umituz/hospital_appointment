import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { FilterSheet, type FilterOption } from "@umituz/react-native-filter";
import { useLocalization } from "@umituz/react-native-localization";
import type { Hospital } from "@/domains/hospitals/types";

interface HospitalPickerFieldProps {
  hospitals: Hospital[];
  selectedHospitalId: string;
  showPicker: boolean;
  onTogglePicker: () => void;
  onSelectHospital: (hospitalId: string) => void;
}

export const HospitalPickerField: React.FC<HospitalPickerFieldProps> = ({
  hospitals,
  selectedHospitalId,
  showPicker,
  onTogglePicker,
  onSelectHospital,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  const hospitalOptions: FilterOption[] = hospitals.map((h) => ({
    id: h.id,
    label: h.name,
  }));

  const selectedHospital = hospitals.find((h) => h.id === selectedHospitalId);

  return (
    <>
      <View style={styles.input}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.label}
        >
          {t("appointments.fields.hospital")} *
        </AtomicText>
        <TouchableOpacity
          onPress={onTogglePicker}
          style={[
            styles.pickerButton,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
          ]}
        >
          <AtomicIcon name="Building2" size="md" color="primary" />
          <AtomicText
            type="bodyLarge"
            color={selectedHospital ? "textPrimary" : "textSecondary"}
            style={styles.pickerText}
          >
            {selectedHospital?.name ||
              t("appointments.placeholders.selectHospital")}
          </AtomicText>
          <AtomicIcon name="ChevronDown" size="md" color="secondary" />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <FilterSheet
          visible={showPicker}
          options={hospitalOptions}
          selectedIds={selectedHospitalId ? [selectedHospitalId] : []}
          onFilterPress={(id) => {
            onSelectHospital(id);
            onTogglePicker();
          }}
          onClearFilters={() => {
            onSelectHospital("");
            onTogglePicker();
          }}
          onClose={onTogglePicker}
          title={t("appointments.fields.hospital")}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
    minHeight: 56,
  },
  pickerText: {
    flex: 1,
  },
});
