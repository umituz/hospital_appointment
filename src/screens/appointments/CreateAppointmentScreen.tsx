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
    handleDateChange,
    handleTimeChange,
  } = useCreateAppointmentForm();

  const { hospitals } = useHospitals();
  const { departments } = useDepartments(); // Tüm department'ları getir
  const { doctors } = useDoctors(); // Tüm doctor'ları getir

  // Debug logging
  console.log("🔍 CreateAppointmentScreen Debug:", {
    formData: {
      hospital_id: formData.hospital_id,
      department_id: formData.department_id,
      doctor_id: formData.doctor_id,
    },
    hospitalsCount: hospitals.length,
    departmentsCount: departments.length,
    doctorsCount: doctors.length,
    note: "Filtreleme kaldırıldı - tüm seçenekler gösteriliyor",
  });

  const handleSelectHospital = useCallback(
    (hospitalId: string) => {
      console.log("🏥 handleSelectHospital called:", { hospitalId });
      onSelectHospital(hospitalId);
      console.log("✅ handleSelectHospital: Hospital selected");
    },
    [onSelectHospital],
  );

  const handleSelectDepartment = useCallback(
    (departmentId: string) => {
      console.log("🩺 handleSelectDepartment called:", { departmentId });
      onSelectDepartment(departmentId);
      console.log("✅ handleSelectDepartment: Department selected");
    },
    [onSelectDepartment],
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
            {t("appointments.create.title")}
          </AtomicText>
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.subtitle}
          >
            {t("appointments.create.description")}
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
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
          />
        </AtomicCard>
      </ScrollView>

      <AppointmentFormActions
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel={t("appointments.create.submit")}
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
