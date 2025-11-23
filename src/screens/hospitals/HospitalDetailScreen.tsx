import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenLayout } from "@umituz/react-native-design-system";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";
import { useRoute } from "@react-navigation/native";
import { useLocalization } from "@umituz/react-native-localization";
import { useHospital } from "@/domains/hospitals";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import {
  HospitalDetailHeader,
  HospitalDetailInfo,
} from "@/domains/hospitals/presentation/components";

interface HospitalDetailScreenParams {
  hospitalId: string;
}

export const HospitalDetailScreen: React.FC = () => {
  const route = useRoute();
  const { t } = useLocalization();
  const { hospitalId } = (route.params as HospitalDetailScreenParams) || {};
  const { hospital, isLoading, error } = useHospital(hospitalId);

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingState icon="Building2" />
      </ScreenLayout>
    );
  }

  if (error || !hospital) {
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
        showsVerticalScrollIndicator={false}
      >
        <AtomicCard variant="elevated" padding="lg" style={styles.headerCard}>
          <HospitalDetailHeader hospital={hospital} />
        </AtomicCard>
        <HospitalDetailInfo hospital={hospital} />
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  headerCard: {
    marginBottom: 16,
  },
});

export default HospitalDetailScreen;
