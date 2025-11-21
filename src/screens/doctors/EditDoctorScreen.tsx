import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ScreenLayout,
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { useLocalization } from "@umituz/react-native-localization";
import { useDoctor, useUpdateDoctor, useDoctorForm } from "@/domains/doctors";
import {
  DoctorFormFields,
  DoctorFormActions,
} from "@/domains/doctors/presentation/components";
import { DepartmentRepository } from "@/domains/appointments/infrastructure/repositories";
import { Department } from "@/domains/appointments/types";

interface EditDoctorScreenParams {
  doctorId: string;
}

export const EditDoctorScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { doctorId } = (route.params as EditDoctorScreenParams) || {};
  const { doctor, isLoading: doctorLoading } = useDoctor(doctorId);
  const { update, isLoading, error } = useUpdateDoctor();
  const { formData, updateFormData } = useDoctorForm(doctor || undefined);
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
    if (!doctorId) {
      Alert.alert(
        t("general.error") || "Error",
        t("doctors.errors.idRequired"),
      );
      return;
    }

    const success = await update(doctorId, formData);
    if (success) {
      Alert.alert(
        t("general.success") || "Success",
        t("doctors.messages.updated") || "Doctor updated successfully",
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
        error.message || t("doctors.errors.updateFailed"),
      );
    }
  }, [update, doctorId, formData, error, t, navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (doctorLoading) {
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
            {t("doctors.edit.title") || "Edit Doctor"}
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
        submitLabel={t("doctors.edit.submit") || "Update Doctor"}
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

export default EditDoctorScreen;
