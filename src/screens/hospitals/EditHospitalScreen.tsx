import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ScreenLayout, AtomicText } from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { useLocalization } from "@umituz/react-native-localization";
import { useEditHospitalForm } from "@/domains/hospitals";
import {
  HospitalFormFields,
  HospitalFormActions,
} from "@/domains/hospitals/presentation/components";

interface EditHospitalScreenParams {
  hospitalId: string;
}

export const EditHospitalScreen: React.FC = () => {
  const route = useRoute();
  const { t } = useLocalization();
  const { hospitalId } = (route.params as EditHospitalScreenParams) || {};
  const {
    hospital,
    isLoading,
    formData,
    updateFormData,
    isLoadingSubmit,
    handleSubmit,
    handleCancel,
  } = useEditHospitalForm(hospitalId);

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingState icon="Building2" />
      </ScreenLayout>
    );
  }

  if (!hospital) {
    return (
      <ScreenLayout>
        <EmptyState
          icon="Building2"
          title="hospitals.errors.notFound"
          description="hospitals.errors.notFoundDescription"
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
            {t("hospitals.edit.title") || "Edit Hospital"}
          </AtomicText>
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.subtitle}
          >
            {t("hospitals.edit.description") ||
              "Update the hospital information below"}
          </AtomicText>
        </View>

        <AtomicCard variant="elevated" padding="lg" style={styles.card}>
          <HospitalFormFields
            formData={formData}
            onUpdateField={updateFormData}
          />
        </AtomicCard>
      </ScrollView>

      <HospitalFormActions
        isLoading={isLoadingSubmit}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel={t("hospitals.edit.submit") || "Update Hospital"}
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

export default EditHospitalScreen;
