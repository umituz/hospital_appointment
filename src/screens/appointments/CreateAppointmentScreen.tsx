import React, { useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ScreenLayout, AtomicText } from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import {
  useCreateAppointmentForm,
  useHospitals,
  useDepartments,
  useDoctors,
} from "@/domains/appointments";
import {
  AppointmentFormFields,
  AppointmentFormActions,
} from "@/domains/appointments/presentation/components";

export const CreateAppointmentScreen: React.FC = () => {
  const { t } = useLocalization();
  const {
    formData,
    updateFormData,
    isLoading,
    handleSubmit,
    handleCancel,
    showHospitalPicker,
    showDepartmentPicker,
    showDoctorPicker,
    setShowHospitalPicker,
    setShowDepartmentPicker,
    setShowDoctorPicker,
    onSelectHospital,
    onSelectDepartment,
    onSelectDoctor,
    handleDateSelect,
    handleTimeSelect,
  } = useCreateAppointmentForm();

  const { hospitals } = useHospitals();
  const { departments } = useDepartments(formData.hospital_id);
  const { doctors } = useDoctors(formData.department_id);

  const handleSelectHospital = useCallback(
    (hospitalId: string) => {
      onSelectHospital(hospitalId);
      updateFormData("department_id", "");
      updateFormData("doctor_id", "");
    },
    [onSelectHospital, updateFormData],
  );

  const handleSelectDepartment = useCallback(
    (departmentId: string) => {
      onSelectDepartment(departmentId);
      updateFormData("doctor_id", "");
    },
    [onSelectDepartment, updateFormData],
  );

  return (
    <ScreenLayout scrollable={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <AtomicText
            type="headlineLarge"
            color="textPrimary"
            style={styles.title}
          >
            {t("appointments.create.title") || "Create Appointment"}
          </AtomicText>
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.subtitle}
          >
            {t("appointments.create.description") ||
              "Fill in the details to schedule a new appointment"}
          </AtomicText>
        </View>

        <AtomicCard variant="elevated" padding="lg" style={styles.card}>
          <AppointmentFormFields
            formData={formData}
            hospitals={hospitals}
            departments={departments}
            doctors={doctors}
            showHospitalPicker={showHospitalPicker}
            showDepartmentPicker={showDepartmentPicker}
            showDoctorPicker={showDoctorPicker}
            onToggleHospitalPicker={() =>
              setShowHospitalPicker(!showHospitalPicker)
            }
            onToggleDepartmentPicker={() =>
              setShowDepartmentPicker(!showDepartmentPicker)
            }
            onToggleDoctorPicker={() => setShowDoctorPicker(!showDoctorPicker)}
            onUpdateField={updateFormData}
            onSelectHospital={handleSelectHospital}
            onSelectDepartment={handleSelectDepartment}
            onSelectDoctor={onSelectDoctor}
            onDateSelect={handleDateSelect}
            onTimeSelect={handleTimeSelect}
          />
        </AtomicCard>
      </ScrollView>

      <AppointmentFormActions
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel={t("appointments.create.submit") || "Schedule Appointment"}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 4,
  },
  card: {
    marginBottom: 16,
  },
});

export default CreateAppointmentScreen;
