import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import {
  AtomicInput,
  AtomicTextArea,
} from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import { DoctorFormData } from "../../types";
import { Department } from "@/domains/appointments/types";
import { DepartmentPicker } from "./DepartmentPicker";

interface DoctorFormFieldsProps {
  formData: DoctorFormData;
  departments: Department[];
  showDepartmentPicker: boolean;
  onToggleDepartmentPicker: () => void;
  onUpdateField: (field: keyof DoctorFormData, value: string | number) => void;
  onSelectDepartment: (departmentId: string) => void;
}

export const DoctorFormFields: React.FC<DoctorFormFieldsProps> = ({
  formData,
  departments,
  showDepartmentPicker,
  onToggleDepartmentPicker,
  onUpdateField,
  onSelectDepartment,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <AtomicInput
        label={t("doctors.fields.name")}
        placeholder={t("doctors.placeholders.name") || "Enter doctor name"}
        value={formData.name}
        onChangeText={(text: string) => onUpdateField("name", text)}
        variant="outlined"
        style={styles.input}
      />

      <AtomicInput
        label={t("doctors.fields.specialty")}
        placeholder={t("doctors.placeholders.specialty") || "Enter specialty"}
        value={formData.specialty}
        onChangeText={(text: string) => onUpdateField("specialty", text)}
        variant="outlined"
        style={styles.input}
      />

      <View style={styles.input}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.label}
        >
          {t("doctors.fields.department")} *
        </AtomicText>
        <TouchableOpacity
          onPress={onToggleDepartmentPicker}
          style={[
            styles.pickerButton,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
          ]}
        >
          <AtomicText
            type="bodyLarge"
            color={formData.department_id ? "textPrimary" : "textSecondary"}
            style={styles.pickerText}
          >
            {formData.department_id
              ? departments.find(
                  (d) => d.id.toString() === formData.department_id,
                )?.name ||
                t("doctors.placeholders.selectDepartment") ||
                "Select Department"
              : t("doctors.placeholders.selectDepartment") ||
                "Select Department"}
          </AtomicText>
          <AtomicIcon name="ChevronDown" size="md" color="secondary" />
        </TouchableOpacity>
      </View>

      <DepartmentPicker
        visible={showDepartmentPicker}
        departments={departments}
        selectedDepartmentId={formData.department_id}
        onSelect={onSelectDepartment}
        onClose={onToggleDepartmentPicker}
      />

      <AtomicInput
        label={t("doctors.fields.phone")}
        placeholder={t("doctors.placeholders.phone") || "Enter phone number"}
        value={formData.phone}
        onChangeText={(text: string) => onUpdateField("phone", text)}
        variant="outlined"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <AtomicInput
        label={t("doctors.fields.email")}
        placeholder={t("doctors.placeholders.email") || "Enter email address"}
        value={formData.email}
        onChangeText={(text: string) => onUpdateField("email", text)}
        variant="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <AtomicInput
        label={t("doctors.fields.rating")}
        placeholder={t("doctors.placeholders.rating") || "0-5"}
        value={formData.rating}
        onChangeText={(text: string) => onUpdateField("rating", text)}
        variant="outlined"
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <AtomicInput
        label={t("doctors.fields.experienceYears")}
        placeholder={
          t("doctors.placeholders.experienceYears") || "Years of experience"
        }
        value={formData.experience_years.toString()}
        onChangeText={(text: string) =>
          onUpdateField("experience_years", parseInt(text) || 0)
        }
        variant="outlined"
        keyboardType="number-pad"
        style={styles.input}
      />

      <AtomicTextArea
        label={t("doctors.fields.notes")}
        placeholder={t("doctors.placeholders.notes") || "Additional notes"}
        value={formData.notes}
        onChangeText={(text: string) => onUpdateField("notes", text)}
        variant="outlined"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
