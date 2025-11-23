import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { Doctor } from "../../types";
import { useDoctorDepartment } from "../../hooks";

interface DoctorDetailHeaderProps {
  doctor: Doctor;
}

export const DoctorDetailHeader: React.FC<DoctorDetailHeaderProps> = ({
  doctor,
}) => {
  const tokens = useAppDesignTokens();
  const departmentName = useDoctorDepartment(doctor.department_id);

  return (
    <View style={styles.container}>
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
          type="headlineMedium"
          color="textPrimary"
          style={styles.name}
        >
          {doctor.name}
        </AtomicText>
        {doctor.specialty && (
          <AtomicText
            type="titleLarge"
            color="primary"
            style={styles.specialty}
          >
            {doctor.specialty}
          </AtomicText>
        )}
        {departmentName && (
          <AtomicText
            type="bodyLarge"
            color="textSecondary"
            style={styles.department}
          >
            {departmentName}
          </AtomicText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
  },
  avatarContainer: {
    width: 100,
    height: 100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
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
  specialty: {
    marginTop: 4,
  },
  department: {
    marginTop: 4,
  },
});
