import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  AtomicButton,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface DoctorFilterChipsProps {
  specialties: string[];
  selectedSpecialty: string | null;
  onSpecialtySelect: (specialty: string | null) => void;
  selectedHospital: string | null;
  onHospitalSelect: (hospital: string | null) => void;
  onAvailableTodayPress: () => void;
}

export const DoctorFilterChips: React.FC<DoctorFilterChipsProps> = ({
  selectedSpecialty,
  onSpecialtySelect,
  selectedHospital,
  onHospitalSelect,
  onAvailableTodayPress,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: tokens.colors.backgroundPrimary },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.chipContainer}>
          <AtomicButton
            variant={selectedSpecialty ? "primary" : "outline"}
            size="sm"
            onPress={() => {
              onSpecialtySelect(selectedSpecialty ? null : "Cardiologist");
            }}
            style={styles.chip}
          >
            {t("doctors.filters.specialization") || "Specialization"}
          </AtomicButton>
          <View style={styles.iconContainer}>
            <AtomicIcon name="ChevronDown" size="sm" color="secondary" />
          </View>
        </View>

        <View style={styles.chipContainer}>
          <AtomicButton
            variant={selectedHospital ? "primary" : "outline"}
            size="sm"
            onPress={() => {
              onHospitalSelect(selectedHospital ? null : "hospital1");
            }}
            style={styles.chip}
          >
            {t("doctors.filters.hospital") || "Hospital"}
          </AtomicButton>
          <View style={styles.iconContainer}>
            <AtomicIcon name="ChevronDown" size="sm" color="secondary" />
          </View>
        </View>

        <View style={styles.chipContainer}>
          <AtomicButton
            variant="outline"
            size="sm"
            onPress={onAvailableTodayPress}
            style={styles.chip}
          >
            {t("doctors.filters.availableToday") || "Available Today"}
          </AtomicButton>
          <View style={styles.iconContainer}>
            <AtomicIcon name="ChevronDown" size="sm" color="secondary" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  chip: {
    marginRight: 0,
    paddingRight: 32,
  },
  iconContainer: {
    position: "absolute",
    right: 12,
    zIndex: 1,
  },
});
