import React, { useCallback } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout, AtomicText } from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import { useCreateHospital, useHospitalForm } from "@/domains/hospitals";
import {
  HospitalFormFields,
  HospitalFormActions,
} from "@/domains/hospitals/presentation/components";

export const CreateHospitalScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const { create, isLoading, error } = useCreateHospital();
  const { formData, updateFormData } = useHospitalForm();

  const handleSubmit = useCallback(async () => {
    const success = await create(formData);
    if (success) {
      Alert.alert(
        t("general.success") || "Success",
        t("hospitals.messages.created") || "Hospital created successfully",
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
        error.message ||
          t("hospitals.errors.createFailed") ||
          "Failed to create hospital",
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
            {t("hospitals.create.title") || "Add New Hospital"}
          </AtomicText>
          <AtomicText
            type="bodyMedium"
            color="textSecondary"
            style={styles.subtitle}
          >
            {t("hospitals.create.description") ||
              "Fill in the information below to add a new hospital"}
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
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel={t("hospitals.create.submit") || "Create Hospital"}
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

export default CreateHospitalScreen;
