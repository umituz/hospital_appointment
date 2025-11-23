import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface HospitalsListHeaderProps {
  hasActiveFilter: boolean;
  onFilterPress: () => void;
  onCityPress?: () => void;
}

export const HospitalsListHeader: React.FC<HospitalsListHeaderProps> = ({
  hasActiveFilter,
  onFilterPress,
  onCityPress,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      {onCityPress && (
        <TouchableOpacity
          onPress={onCityPress}
          style={styles.button}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <AtomicIcon name="MapPin" size="lg" color="secondary" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={onFilterPress}
        style={[
          styles.button,
          hasActiveFilter && {
            backgroundColor: tokens.colors.primary + "20",
          },
        ]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <AtomicIcon
          name="Filter"
          size="lg"
          color={hasActiveFilter ? "primary" : "secondary"}
        />
        {hasActiveFilter && (
          <View
            style={[styles.badge, { backgroundColor: tokens.colors.primary }]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    gap: 8,
  },
  button: {
    padding: 8,
    borderRadius: 20,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
