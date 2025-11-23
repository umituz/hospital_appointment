import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import {
  AtomicText,
  AtomicButton,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { Hospital } from "../../types";
import { AtomicCard } from "@umituz/react-native-design-system-atoms";

interface HospitalDetailInfoProps {
  hospital: Hospital;
}

interface InfoRowProps {
  label: string;
  value?: string | number;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return (
    <View style={styles.infoRow}>
      <AtomicText type="bodyLarge" color="textSecondary">
        {label}:
      </AtomicText>
      <AtomicText type="bodyLarge" color="textPrimary">
        {String(value)}
      </AtomicText>
    </View>
  );
};

export const HospitalDetailInfo: React.FC<HospitalDetailInfoProps> = ({
  hospital,
}) => {
  const { t } = useLocalization();

  return (
    <AtomicCard variant="elevated" padding="lg" style={styles.card}>
      <AtomicText type="titleMedium" color="textPrimary" style={styles.title}>
        {t("hospitals.detail.information") || "Information"}
      </AtomicText>
      <InfoRow label={t("hospitals.fields.phone")} value={hospital.phone} />
      <InfoRow label={t("hospitals.fields.email")} value={hospital.email} />

      {hospital.googleMapsUrl && (
        <View style={styles.mapsButtonContainer}>
          <AtomicButton
            variant="outline"
            size="md"
            onPress={() => Linking.openURL(hospital.googleMapsUrl!)}
            style={styles.mapsButton}
          >
            📍 Open in Google Maps
          </AtomicButton>
        </View>
      )}
      {hospital.notes && (
        <View style={styles.notesContainer}>
          <AtomicText type="bodyLarge" color="textSecondary">
            {t("hospitals.fields.notes")}:
          </AtomicText>
          <AtomicText type="bodyLarge" color="textPrimary">
            {hospital.notes}
          </AtomicText>
        </View>
      )}
    </AtomicCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  mapsButtonContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  mapsButton: {
    width: "100%",
  },
  notesContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
  },
});
