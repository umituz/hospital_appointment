import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ScreenLayout,
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import { useCreateDoctor, useDoctorForm } from "@/domains/doctors";
import { useHospitals } from "@/domains/hospitals";
import {
  DoctorFormFields,
  DoctorFormActions,
  DepartmentPicker,
} from "@/domains/doctors/presentation/components";
import { HospitalPickerField } from "@/domains/appointments/presentation/components";
import { DepartmentRepository } from "@/domains/appointments/infrastructure/repositories";
import { Department } from "@/domains/appointments/types";
import { Hospital } from "@/domains/hospitals/types";

export const CreateDoctorScreen: React.FC = () => {
  const navigation = useNavigation();
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { create, isLoading, error } = useCreateDoctor();
  const { formData, updateFormData } = useDoctorForm();
  const { hospitals } = useHospitals();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showHospitalPicker, setShowHospitalPicker] = useState(false);
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);

  useEffect(() => {
    const loadDepartments = async () => {
      const repository = new DepartmentRepository();
      const data = await repository.getAll();
      setDepartments(data);
    };
    loadDepartments();
  }, []);

  const handleSelectHospital = useCallback(
    async (hospitalId: string) => {
      updateFormData("hospital_id", hospitalId);
      updateFormData("department_id", ""); // Reset department when hospital changes
      setShowHospitalPicker(false);

      // Load departments for selected hospital
      const repository = new DepartmentRepository();
      const data = await repository.getByHospitalId(hospitalId);
      setDepartments(data);
    },
    [updateFormData],
  );

  const handleSelectDepartment = useCallback(
    (departmentId: string) => {
      updateFormData("department_id", departmentId);
      setShowDepartmentPicker(false);
    },
    [updateFormData],
  );

  const handleSubmit = useCallback(async () => {
    const success = await create(formData);
    if (success) {
      Alert.alert(
        t("general.success") || "Success",
        t("doctors.messages.created") || "Doctor created successfully",
        [
          {
            text: t("general.ok") || "OK",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } else if (error) {
      Alert.alert(
        t("general.error") || "Error",
        error.message || t("doctors.errors.createFailed"),
      );
    }
  }, [create, formData, error, t, navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
            {t("doctors.create.title") || "Add New Doctor"}
          </AtomicText>
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.subtitle}
          >
            {t("doctors.create.description") ||
              "Fill in the information below to add a new doctor"}
          </AtomicText>
        </View>

        <AtomicCard variant="elevated" padding="lg" style={styles.card}>
          <HospitalPickerField
            selectedHospitalId={formData.hospital_id}
            onSelectHospital={handleSelectHospital}
            onTogglePicker={() => setShowHospitalPicker(!showHospitalPicker)}
            showPicker={showHospitalPicker}
            hospitals={hospitals}
          />

          <DoctorFormFields
            formData={formData}
            departments={departments}
            showDepartmentPicker={showDepartmentPicker}
            onToggleDepartmentPicker={() =>
              setShowDepartmentPicker(!showDepartmentPicker)
            }
            onUpdateField={updateFormData}
            onSelectDepartment={handleSelectDepartment}
          />
        </AtomicCard>
      </ScrollView>

      <DoctorFormActions
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel={t("doctors.create.submit") || "Create Doctor"}
      />

      <DepartmentPicker
        visible={showDepartmentPicker}
        departments={departments}
        selectedDepartmentId={formData.department_id}
        onSelect={handleSelectDepartment}
        onClose={() => setShowDepartmentPicker(false)}
      />

      <HospitalPickerField
        selectedHospitalId={formData.hospital_id}
        onSelectHospital={handleSelectHospital}
        onTogglePicker={() => setShowHospitalPicker(!showHospitalPicker)}
        showPicker={showHospitalPicker}
        hospitals={hospitals}
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

export default CreateDoctorScreen;
