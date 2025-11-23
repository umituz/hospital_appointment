import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { FilterSheet, type FilterOption } from "@umituz/react-native-filter";
import { useLocalization } from "@umituz/react-native-localization";
import type { Doctor } from "@/domains/doctors/types";

interface DoctorPickerFieldProps {
  doctors: Doctor[];
  selectedDoctorId: string;
  showPicker: boolean;
  onTogglePicker: () => void;
  onSelectDoctor: (doctorId: string) => void;
}

export const DoctorPickerField: React.FC<DoctorPickerFieldProps> = ({
  doctors,
  selectedDoctorId,
  showPicker,
  onTogglePicker,
  onSelectDoctor,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  const doctorOptions: FilterOption[] = doctors.map((d) => ({
    id: d.id,
    label: d.name,
  }));

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  return (
    <>
      <View style={styles.input}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.label}
        >
          {t("appointments.fields.doctor")}
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
          <AtomicIcon name="User" size="md" color="primary" />
          <AtomicText
            type="bodyLarge"
            color={selectedDoctor ? "textPrimary" : "textSecondary"}
            style={styles.pickerText}
          >
            {selectedDoctor?.name ||
              t("appointments.placeholders.selectDoctor")}
          </AtomicText>
          <AtomicIcon name="ChevronDown" size="md" color="secondary" />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <FilterSheet
          visible={showPicker}
          options={doctorOptions}
          selectedIds={selectedDoctorId ? [selectedDoctorId] : []}
          onFilterPress={(id) => {
            onSelectDoctor(id);
            onTogglePicker();
          }}
          onClearFilters={() => {
            onSelectDoctor("");
            onTogglePicker();
          }}
          onClose={onTogglePicker}
          title={t("appointments.fields.doctor")}
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
