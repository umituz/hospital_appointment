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
import {
  DoctorFormFields,
  DoctorFormActions,
} from "@/domains/doctors/presentation/components";
import { DepartmentRepository } from "@/domains/appointments/infrastructure/repositories";
import { Department } from "@/domains/appointments/types";

export const CreateDoctorScreen: React.FC = () => {
  const navigation = useNavigation();
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { create, isLoading, error } = useCreateDoctor();
  const { formData, updateFormData } = useDoctorForm();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);

  useEffect(() => {
    const loadDepartments = async () => {
      const repository = new DepartmentRepository();
      const data = await repository.getAll();
      setDepartments(data);
    };
    loadDepartments();
  }, []);

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
    <ScreenLayout>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <AtomicCard variant="elevated" padding="lg" style={styles.card}>
          <AtomicText
            type="headlineMedium"
            color="textPrimary"
            style={styles.title}
          >
            {t("doctors.create.title") || "Add New Doctor"}
          </AtomicText>

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
  card: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 24,
  },
});

export default CreateDoctorScreen;
