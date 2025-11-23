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
import { FilterSheet, type FilterOption } from "@umituz/react-native-filter";
import { useLocalization } from "@umituz/react-native-localization";
import { AppointmentFormData } from "../../types";
import type { Hospital } from "@/domains/hospitals/types";
import type { Department } from "../../types";
import type { Doctor } from "@/domains/doctors/types";

interface AppointmentFormFieldsProps {
  formData: AppointmentFormData;
  hospitals: Hospital[];
  departments: Department[];
  doctors: Doctor[];
  showHospitalPicker: boolean;
  showDepartmentPicker: boolean;
  showDoctorPicker: boolean;
  onToggleHospitalPicker: () => void;
  onToggleDepartmentPicker: () => void;
  onToggleDoctorPicker: () => void;
  onUpdateField: (
    field: keyof AppointmentFormData,
    value: string | boolean | number,
  ) => void;
  onSelectHospital: (hospitalId: string) => void;
  onSelectDepartment: (departmentId: string) => void;
  onSelectDoctor: (doctorId: string) => void;
  onDateSelect: () => void;
  onTimeSelect: () => void;
}

export const AppointmentFormFields: React.FC<AppointmentFormFieldsProps> = ({
  formData,
  hospitals,
  departments,
  doctors,
  showHospitalPicker,
  showDepartmentPicker,
  showDoctorPicker,
  onToggleHospitalPicker,
  onToggleDepartmentPicker,
  onToggleDoctorPicker,
  onUpdateField,
  onSelectHospital,
  onSelectDepartment,
  onSelectDoctor,
  onDateSelect,
  onTimeSelect,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  const hospitalOptions: FilterOption[] = hospitals.map((h) => ({
    id: h.id.toString(),
    label: h.name,
  }));

  const departmentOptions: FilterOption[] = departments.map((d) => ({
    id: d.id.toString(),
    label: d.name,
  }));

  const doctorOptions: FilterOption[] = doctors.map((d) => ({
    id: d.id.toString(),
    label: d.name,
  }));

  const selectedHospital = hospitals.find(
    (h) => h.id.toString() === formData.hospital_id,
  );
  const selectedDepartment = departments.find(
    (d) => d.id.toString() === formData.department_id,
  );
  const selectedDoctor = doctors.find(
    (d) => d.id.toString() === formData.doctor_id,
  );

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.label}
        >
          {t("appointments.fields.hospital")} *
        </AtomicText>
        <TouchableOpacity
          onPress={onToggleHospitalPicker}
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

      {formData.hospital_id && (
        <View style={styles.input}>
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.label}
          >
            {t("appointments.fields.department")} *
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
      )}

      {formData.department_id && (
        <View style={styles.input}>
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.label}
          >
            {t("appointments.fields.doctor")} *
          </AtomicText>
          <TouchableOpacity
            onPress={onToggleDoctorPicker}
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
      )}

      <View style={styles.input}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.label}
        >
          {t("appointments.fields.date")} *
        </AtomicText>
        <TouchableOpacity
          onPress={onDateSelect}
          style={[
            styles.pickerButton,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
          ]}
        >
          <AtomicIcon name="Calendar" size="md" color="primary" />
          <AtomicText
            type="bodyLarge"
            color={formData.appointment_date ? "textPrimary" : "textSecondary"}
            style={styles.pickerText}
          >
            {formData.appointment_date ||
              t("appointments.placeholders.selectDate")}
          </AtomicText>
        </TouchableOpacity>
      </View>

      <View style={styles.input}>
        <AtomicText
          type="bodyMedium"
          color="textSecondary"
          style={styles.label}
        >
          {t("appointments.fields.time")} *
        </AtomicText>
        <TouchableOpacity
          onPress={onTimeSelect}
          style={[
            styles.pickerButton,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
          ]}
        >
          <AtomicIcon name="Clock" size="md" color="primary" />
          <AtomicText
            type="bodyLarge"
            color={formData.appointment_time ? "textPrimary" : "textSecondary"}
            style={styles.pickerText}
          >
            {formData.appointment_time ||
              t("appointments.placeholders.selectTime")}
          </AtomicText>
        </TouchableOpacity>
      </View>

      <AtomicInput
        label={t("appointments.fields.patientName")}
        placeholder={t("appointments.placeholders.enterPatientName")}
        value={formData.patient_name}
        onChangeText={(text: string) => onUpdateField("patient_name", text)}
        variant="outlined"
        style={styles.input}
      />

      <AtomicInput
        label={t("appointments.fields.patientPhone")}
        placeholder={t("appointments.placeholders.enterPatientPhone")}
        value={formData.patient_phone}
        onChangeText={(text: string) => onUpdateField("patient_phone", text)}
        variant="outlined"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <AtomicTextArea
        label={t("appointments.fields.notes")}
        placeholder={t("appointments.placeholders.addNotes")}
        value={formData.notes}
        onChangeText={(text: string) => onUpdateField("notes", text)}
        variant="outlined"
        style={styles.input}
      />

      <View style={styles.input}>
        <View style={styles.reminderHeader}>
          <AtomicIcon name="Bell" size="md" color="primary" />
          <AtomicText
            type="bodyMedium"
            color="textPrimary"
            style={styles.reminderLabel}
          >
            {t("appointments.fields.reminder")}
          </AtomicText>
          <TouchableOpacity
            onPress={() =>
              onUpdateField("reminder_enabled", !formData.reminder_enabled)
            }
            style={[
              styles.toggle,
              {
                backgroundColor: formData.reminder_enabled
                  ? tokens.colors.primary
                  : tokens.colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.toggleThumb,
                {
                  backgroundColor: tokens.colors.surface,
                  transform: [
                    { translateX: formData.reminder_enabled ? 20 : 0 },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
        </View>

        {formData.reminder_enabled && (
          <View style={styles.reminderOptions}>
            {[15, 30, 60, 120].map((minutes) => (
              <TouchableOpacity
                key={minutes}
                onPress={() => onUpdateField("reminder_time", minutes)}
                style={[
                  styles.reminderOption,
                  {
                    backgroundColor:
                      formData.reminder_time === minutes
                        ? tokens.colors.primary
                        : tokens.colors.surface,
                    borderColor: tokens.colors.border,
                  },
                ]}
              >
                <AtomicText
                  type="bodySmall"
                  color={
                    formData.reminder_time === minutes
                      ? "textOnPrimary"
                      : "textPrimary"
                  }
                >
                  {minutes} {t("appointments.detail.minutesBefore")}
                </AtomicText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <FilterSheet
        visible={showHospitalPicker}
        options={hospitalOptions}
        selectedIds={formData.hospital_id ? [formData.hospital_id] : []}
        onFilterPress={(id) => {
          onSelectHospital(id);
          onToggleHospitalPicker();
        }}
        onClearFilters={() => {
          onSelectHospital("");
          onToggleHospitalPicker();
        }}
        onClose={onToggleHospitalPicker}
        title={t("appointments.fields.hospital")}
      />

      <FilterSheet
        visible={showDepartmentPicker}
        options={departmentOptions}
        selectedIds={formData.department_id ? [formData.department_id] : []}
        onFilterPress={(id) => {
          onSelectDepartment(id);
          onToggleDepartmentPicker();
        }}
        onClearFilters={() => {
          onSelectDepartment("");
          onToggleDepartmentPicker();
        }}
        onClose={onToggleDepartmentPicker}
        title={t("appointments.fields.department")}
      />

      <FilterSheet
        visible={showDoctorPicker}
        options={doctorOptions}
        selectedIds={formData.doctor_id ? [formData.doctor_id] : []}
        onFilterPress={(id) => {
          onSelectDoctor(id);
          onToggleDoctorPicker();
        }}
        onClearFilters={() => {
          onSelectDoctor("");
          onToggleDoctorPicker();
        }}
        onClose={onToggleDoctorPicker}
        title={t("appointments.fields.doctor")}
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
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  reminderLabel: {
    flex: 1,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  reminderOptions: {
    flexDirection: "row",
    gap: 8,
  },
  reminderOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
});
