import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  AtomicText,
  AtomicButton,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { Doctor } from "../../types";
import { DepartmentRepository } from "@/domains/appointments/infrastructure/repositories";
import { Department } from "@/domains/appointments/types";

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile?: () => void;
  onBookNow?: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onViewProfile,
  onBookNow,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const [departmentName, setDepartmentName] = useState<string>("");

  useEffect(() => {
    const loadDepartment = async () => {
      if (doctor.department_id) {
        const repository = new DepartmentRepository();
        const departments = await repository.getAll();
        const department = departments.find(
          (d) => d.id.toString() === doctor.department_id,
        );
        if (department) {
          setDepartmentName(department.name);
        }
      }
    };
    loadDepartment();
  }, [doctor.department_id]);

  return (
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
        </View>
      </View>

      <View style={styles.actions}>
        <AtomicButton
          variant="outline"
          size="md"
          onPress={onViewProfile || (() => {})}
          style={styles.actionButton}
        >
          {t("doctors.card.viewProfile") || "View Profile"}
        </AtomicButton>
        <AtomicButton
          variant="primary"
          size="md"
          onPress={onBookNow || (() => {})}
          style={styles.actionButton}
        >
          {t("doctors.card.bookNow") || "Book Now"}
        </AtomicButton>
      </View>
    </View>
  );
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
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
