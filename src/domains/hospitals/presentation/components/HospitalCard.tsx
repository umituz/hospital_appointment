import React from "react";
import { View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicButton,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import {
  SwipeableItem,
  useSwipeActions,
} from "@umituz/react-native-swipe-actions";
import { useTimezone } from "@umituz/react-native-timezone";
import { Hospital } from "../../types";

interface HospitalCardProps {
  hospital: Hospital;
  onEditProfile?: () => void;
  onShowDetails?: () => void;
  onDelete?: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital,
  onEditProfile,
  onShowDetails,
  onDelete,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { formatDate } = useTimezone();
  const { createDeleteAction, createEditAction } = useSwipeActions();

  const rightActions = [];
  if (onDelete) {
    rightActions.push(createDeleteAction(onDelete));
  }

  const cardContent = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: tokens.colors.surface,
          borderColor: tokens.colors.borderLight,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: tokens.colors.primaryLight },
            ]}
          >
            <AtomicIcon name="Building2" size="xl" color="primary" />
          </View>
        </View>

        <View style={styles.info}>
          <AtomicText
            type="headlineSmall"
            color="textPrimary"
            style={styles.name}
          >
            {hospital.name}
          </AtomicText>
          {hospital.address && (
            <View style={styles.addressRow}>
              <AtomicIcon name="MapPin" size="sm" color="secondary" />
              <AtomicText
                type="bodyMedium"
                color="textSecondary"
                style={styles.address}
              >
                {hospital.address}
              </AtomicText>
            </View>
          )}

          {hospital.googleMapsUrl && (
            <TouchableOpacity
              style={styles.mapsRow}
              onPress={() => Linking.openURL(hospital.googleMapsUrl!)}
            >
              <AtomicIcon name="Navigation" size="sm" color="primary" />
              <AtomicText
                type="bodyMedium"
                color="primary"
                style={styles.mapsLink}
              >
                Open in Google Maps
              </AtomicText>
            </TouchableOpacity>
          )}
          {hospital.phone && (
            <View style={styles.phoneRow}>
              <AtomicIcon name="Phone" size="sm" color="secondary" />
              <AtomicText
                type="bodyMedium"
                color="textSecondary"
                style={styles.phone}
              >
                {hospital.phone}
              </AtomicText>
            </View>
          )}
          {hospital.created_at && (
            <AtomicText
              type="bodySmall"
              color="textSecondary"
              style={styles.date}
            >
              {t("hospitals.fields.createdAt") || "Created"}:{" "}
              {formatDate(new Date(hospital.created_at))}
            </AtomicText>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <AtomicButton
          variant="outline"
          size="md"
          onPress={onShowDetails || (() => {})}
          style={styles.actionButton}
        >
          {t("hospitals.card.showDetails") || "Show Details"}
        </AtomicButton>
        <AtomicButton
          variant="primary"
          size="md"
          onPress={onEditProfile || (() => {})}
          style={styles.actionButton}
        >
          {t("hospitals.card.edit") || "Edit Hospital"}
        </AtomicButton>
      </View>
    </View>
  );

  if (rightActions.length > 0) {
    return (
      <SwipeableItem rightActions={rightActions}>{cardContent}</SwipeableItem>
    );
  }

  return cardContent;
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 70,
    height: 70,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    gap: 8,
  },
  name: {
    marginTop: 0,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  address: {
    flex: 1,
    marginTop: 0,
  },
  mapsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 2,
  },
  mapsLink: {
    flex: 1,
    marginTop: 0,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  phone: {
    marginTop: 0,
  },
  date: {
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
