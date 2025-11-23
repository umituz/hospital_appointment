import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ScreenLayout, AtomicText } from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { useLocalization } from "@umituz/react-native-localization";
import { useEditDoctorForm } from "@/domains/doctors";
import {
  DoctorFormFields,
  DoctorFormActions,
  DepartmentPicker,
} from "@/domains/doctors/presentation/components";

interface EditDoctorScreenParams {
  doctorId: string;
}

export const EditDoctorScreen: React.FC = () => {
  const route = useRoute();
  const { t } = useLocalization();
  const { doctorId } = (route.params as EditDoctorScreenParams) || {};
  const {
    doctor,
    isLoading,
    formData,
    updateFormData,
    departments,
    showDepartmentPicker,
    isLoadingSubmit,
    handleSelectDepartment,
    handleSubmit,
    handleCancel,
    toggleDepartmentPicker,
    closeDepartmentPicker,
  } = useEditDoctorForm(doctorId);

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingState icon="User" />
      </ScreenLayout>
    );
  }

  if (!doctor) {
    return (
      <ScreenLayout>
        <EmptyState
          icon="User"
          title="doctors.errors.notFound"
          description="doctors.errors.notFoundDescription"
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
            {t("doctors.edit.title") || "Edit Doctor"}
          </AtomicText>
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.subtitle}
          >
            {t("doctors.edit.description") ||
              "Update the doctor information below"}
          </AtomicText>
        </View>

        <AtomicCard variant="elevated" padding="lg" style={styles.card}>
          <DoctorFormFields
            formData={formData}
            departments={departments}
            showDepartmentPicker={showDepartmentPicker}
            onToggleDepartmentPicker={toggleDepartmentPicker}
            onUpdateField={updateFormData}
            onSelectDepartment={handleSelectDepartment}
          />
        </AtomicCard>
      </ScrollView>

      <DoctorFormActions
        isLoading={isLoadingSubmit}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel={t("doctors.edit.submit") || "Update Doctor"}
      />

      <DepartmentPicker
        visible={showDepartmentPicker}
        departments={departments}
        selectedDepartmentId={formData.department_id}
        onSelect={handleSelectDepartment}
        onClose={closeDepartmentPicker}
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

export default EditDoctorScreen;
