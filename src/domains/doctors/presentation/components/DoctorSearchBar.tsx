import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicInput } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";

interface DoctorSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const DoctorSearchBar: React.FC<DoctorSearchBarProps> = ({
  value,
  onChangeText,
}) => {
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <AtomicInput
        placeholder={
          t("doctors.search.placeholder") || "Search by name, specialty..."
        }
        value={value}
        onChangeText={onChangeText}
        variant="outlined"
        leadingIcon="Search"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  input: {
    marginBottom: 0,
  },
});
