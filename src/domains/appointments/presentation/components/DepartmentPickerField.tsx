import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { FilterSheet, type FilterOption } from "@umituz/react-native-filter";
import { useLocalization } from "@umituz/react-native-localization";
import { Department } from "../../types";

interface DepartmentPickerFieldProps {
  departments: Department[];
  selectedDepartmentId: string;
  showPicker: boolean;
  onTogglePicker: () => void;
  onSelectDepartment: (departmentId: string) => void;
}

export const DepartmentPickerField: React.FC<DepartmentPickerFieldProps> = ({
  departments,
  selectedDepartmentId,
  showPicker,
  onTogglePicker,
  onSelectDepartment,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  const departmentOptions: FilterOption[] = departments.map((d) => ({
    id: d.id,
    label: d.name,
  }));

  const selectedDepartment = departments.find(
    (d) => d.id === selectedDepartmentId,
  );

  return (
    <>
      <View style={styles.input}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.label}
        >
          {t("appointments.fields.department")} *
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
          <AtomicIcon name="Layers" size="md" color="primary" />
          <AtomicText
            type="bodyLarge"
            color={selectedDepartment ? "textPrimary" : "textSecondary"}
            style={styles.pickerText}
          >
            {selectedDepartment?.name ||
              t("appointments.placeholders.selectDepartment")}
          </AtomicText>
          <AtomicIcon name="ChevronDown" size="md" color="secondary" />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <FilterSheet
          visible={showPicker}
          options={departmentOptions}
          selectedIds={selectedDepartmentId ? [selectedDepartmentId] : []}
          onFilterPress={(id) => {
            onSelectDepartment(id);
            onTogglePicker();
          }}
          onClearFilters={() => {
            onSelectDepartment("");
            onTogglePicker();
          }}
          onClose={onTogglePicker}
          title={t("appointments.fields.department")}
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
