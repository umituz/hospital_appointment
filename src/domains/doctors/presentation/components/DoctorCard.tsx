import React from "react";
import { View, StyleSheet, Image } from "react-native";
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
import { Doctor } from "../../types";
import { useDoctorDepartment } from "../../hooks";

interface DoctorCardProps {
  doctor: Doctor;
  onEditProfile?: () => void;
  onShowDetails?: () => void;
  onDelete?: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onEditProfile,
  onShowDetails,
  onDelete,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { formatDate } = useTimezone();
  const departmentName = useDoctorDepartment(doctor.department_id);
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
        <View style={styles.avatarContainer}>
          {doctor.image ? (
            <Image
              source={{ uri: doctor.image }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.avatar,
                styles.avatarPlaceholder,
                { backgroundColor: tokens.colors.primaryLight },
              ]}
            >
              <AtomicIcon name="User" size="xl" color="primary" />
            </View>
          )}
        </View>

        <View style={styles.info}>
          <AtomicText
            type="headlineSmall"
            color="textPrimary"
            style={styles.name}
          >
            {doctor.name}
          </AtomicText>
          {doctor.specialty && (
            <AtomicText
              type="bodyLarge"
              color="primary"
              style={styles.specialty}
            >
              {doctor.specialty}
            </AtomicText>
          )}
          {departmentName && (
            <AtomicText
              type="bodyMedium"
              color="textSecondary"
              style={styles.hospital}
            >
              {departmentName}
            </AtomicText>
          )}
          {doctor.created_at && (
            <AtomicText
              type="bodySmall"
              color="textSecondary"
              style={styles.date}
            >
              {t("doctors.fields.createdAt") || "Created"}:{" "}
              {formatDate(new Date(doctor.created_at))}
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
          {t("doctors.card.showDetails") || "Show Details"}
        </AtomicButton>
        <AtomicButton
          variant="primary"
          size="md"
          onPress={onEditProfile || (() => {})}
          style={styles.actionButton}
        >
          {t("doctors.card.editProfile") || "Edit Profile"}
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
  avatarContainer: {
    width: 70,
    height: 70,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    marginTop: 0,
  },
  specialty: {
    marginTop: 4,
  },
  hospital: {
    marginTop: 4,
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
