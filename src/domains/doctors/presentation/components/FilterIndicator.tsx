import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface FilterIndicatorProps {
  filterLabels: string[];
  onClear: () => void;
}

export const FilterIndicator: React.FC<FilterIndicatorProps> = ({
  filterLabels,
  onClear,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  if (filterLabels.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.primary + "20",
        },
      ]}
    >
      <View style={styles.content}>
        <AtomicText
          type="bodySmall"
          style={{
            color: tokens.colors.primary,
            fontWeight: "500",
          }}
        >
          {t("doctors.filters.active") || "Filtered by"}:{" "}
          {filterLabels.join(", ")}
        </AtomicText>
        <TouchableOpacity
          onPress={onClear}
          style={styles.clearButton}
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        >
          <AtomicIcon name="X" size="sm" color="primary" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  clearButton: {
    padding: 4,
  },
});
