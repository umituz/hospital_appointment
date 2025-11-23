import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { Hospital } from "../../types";

interface HospitalDetailHeaderProps {
  hospital: Hospital;
}

export const HospitalDetailHeader: React.FC<HospitalDetailHeaderProps> = ({
  hospital,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
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
          type="headlineMedium"
          color="textPrimary"
          style={styles.name}
        >
          {hospital.name}
        </AtomicText>
        {hospital.address && (
          <View style={styles.addressRow}>
            <AtomicIcon name="MapPin" size="sm" color="secondary" />
            <AtomicText
              type="bodyLarge"
              color="textSecondary"
              style={styles.address}
            >
              {hospital.address}
            </AtomicText>
          </View>
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
  iconContainer: {
    width: 100,
    height: 100,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginTop: 4,
  },
  address: {
    flex: 1,
  },
});
