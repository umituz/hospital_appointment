import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { Doctor } from "../../types";

interface DoctorDetailInfoProps {
  doctor: Doctor;
}

interface InfoRowProps {
  label: string;
  value: string | number | undefined;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  const tokens = useAppDesignTokens();

  if (!value) {
    return null;
  }

  return (
    <View style={styles.row}>
      <AtomicText type="bodyMedium" color="textSecondary" style={styles.label}>
        {label}:
      </AtomicText>
      <AtomicText type="bodyLarge" color="textPrimary" style={styles.value}>
        {value}
      </AtomicText>
    </View>
  );
};

export const DoctorDetailInfo: React.FC<DoctorDetailInfoProps> = ({
  doctor,
}) => {
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <AtomicText
        type="titleLarge"
        color="textPrimary"
        style={styles.sectionTitle}
      >
        {t("doctors.detail.information") || "Information"}
      </AtomicText>

      <View style={styles.infoContainer}>
        <InfoRow
          label={t("doctors.fields.phone") || "Phone"}
          value={doctor.phone}
        />
        <InfoRow
          label={t("doctors.fields.email") || "Email"}
          value={doctor.email}
        />
        <InfoRow
          label={t("doctors.fields.rating") || "Rating"}
          value={doctor.rating}
        />
        <InfoRow
          label={t("doctors.fields.experienceYears") || "Experience Years"}
          value={doctor.experience_years}
        />
      </View>

      {doctor.notes && (
        <View style={styles.notesContainer}>
          <AtomicText
            type="titleMedium"
            color="textPrimary"
            style={styles.notesTitle}
          >
            {t("doctors.fields.notes") || "Notes"}
          </AtomicText>
          <AtomicText type="bodyMedium" color="textSecondary">
            {doctor.notes}
          </AtomicText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  infoContainer: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 2,
    textAlign: "right",
  },
  notesContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  notesTitle: {
    marginBottom: 8,
  },
});
