import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ScreenLayout, AtomicText } from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import { useDoctor } from "@/domains/doctors";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { DoctorDetailHeader } from "@/domains/doctors/presentation/components/DoctorDetailHeader";
import { DoctorDetailInfo } from "@/domains/doctors/presentation/components/DoctorDetailInfo";

interface DoctorDetailScreenParams {
  doctorId: string;
}

export const DoctorDetailScreen: React.FC = () => {
  const route = useRoute();
  const { t } = useLocalization();
  const { doctorId } = (route.params as DoctorDetailScreenParams) || {};
  const { doctor, isLoading, error } = useDoctor(doctorId);

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingState icon="User" />
      </ScreenLayout>
    );
  }

  if (error || !doctor) {
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
      >
        <View style={styles.header}>
          <AtomicText
            type="headlineLarge"
            color="textPrimary"
            style={styles.title}
          >
            {t("doctors.detail.title") || "Doctor Details"}
          </AtomicText>
        </View>

        <AtomicCard variant="elevated" padding="lg" style={styles.card}>
          <DoctorDetailHeader doctor={doctor} />
        </AtomicCard>

        <AtomicCard variant="elevated" padding="lg" style={styles.card}>
          <DoctorDetailInfo doctor={doctor} />
        </AtomicCard>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  title: {
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
  },
});

export default DoctorDetailScreen;
