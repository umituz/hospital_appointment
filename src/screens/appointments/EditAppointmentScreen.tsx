import React, { useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ScreenLayout, AtomicText } from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { useLocalization } from "@umituz/react-native-localization";
import {
  useEditAppointmentForm,
  useHospitals,
  useDepartments,
  useDoctors,
} from "@/domains/appointments";
import {
  AppointmentFormFields,
  AppointmentFormActions,
} from "@/domains/appointments/presentation/components";

interface EditAppointmentScreenParams {
  appointmentId: string;
}

export const EditAppointmentScreen: React.FC = () => {
  const route = useRoute();
  const { t } = useLocalization();
  const { appointmentId } = (route.params as EditAppointmentScreenParams) || {};
  const {
    appointment,
    isLoading,
    formData,
    updateFormData,
    isLoadingSubmit,
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
  } = useEditAppointmentForm(appointmentId);

  const { hospitals } = useHospitals();
  const { departments } = useDepartments(); // Tüm department'ları getir
  const { doctors } = useDoctors(); // Tüm doctor'ları getir

  const handleSelectHospital = useCallback(
    (hospitalId: string) => {
      onSelectHospital(hospitalId);
    },
    [onSelectHospital],
  );

  const handleSelectDepartment = useCallback(
    (departmentId: string) => {
      onSelectDepartment(departmentId);
    },
    [onSelectDepartment],
  );

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingState icon="Calendar" />
      </ScreenLayout>
    );
  }

  if (!appointment) {
    return (
      <ScreenLayout>
        <EmptyState
          icon="Calendar"
          title="appointments.errors.notFound"
          description="appointments.errors.notFoundDescription"
        />
      </ScreenLayout>
    );
  }

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
            {t("appointments.edit.title")}
          </AtomicText>
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.subtitle}
          >
            {t("appointments.edit.description")}
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
        isLoading={isLoadingSubmit}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel={t("appointments.edit.submit")}
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

export default EditAppointmentScreen;
