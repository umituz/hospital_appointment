import React, { useCallback, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { BottomSheet, useBottomSheet } from "@umituz/react-native-bottom-sheet";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { Department } from "@/domains/appointments/types";

interface DepartmentPickerProps {
  visible: boolean;
  departments: Department[];
  selectedDepartmentId?: string;
  onSelect: (departmentId: string) => void;
  onClose: () => void;
}

export const DepartmentPicker: React.FC<DepartmentPickerProps> = ({
  visible,
  departments,
  selectedDepartmentId,
  onSelect,
  onClose,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();
  const { sheetRef, open, close } = useBottomSheet();

  useEffect(() => {
    if (visible) {
      open();
    } else {
      close();
    }
  }, [visible, open, close]);

  const handleSelect = useCallback(
    (departmentId: string) => {
      onSelect(departmentId);
      close();
      onClose();
    },
    [onSelect, close, onClose],
  );

  const renderItem = useCallback(
    ({ item }: { item: Department }) => {
      const isSelected = item.id.toString() === selectedDepartmentId;
      return (
        <TouchableOpacity
          onPress={() => handleSelect(item.id.toString())}
          style={[
            styles.item,
            {
              backgroundColor: isSelected
                ? tokens.colors.primaryLight
                : tokens.colors.surface,
            },
          ]}
        >
          <AtomicText
            type="bodyLarge"
            color={isSelected ? "primary" : "textPrimary"}
          >
            {item.name}
          </AtomicText>
        </TouchableOpacity>
      );
    },
    [selectedDepartmentId, handleSelect, tokens],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      preset="medium"
      snapPoints={["50%", "75%"]}
      onClose={onClose}
    >
      <AtomicText type="headlineSmall" color="textPrimary" style={styles.title}>
        {t("doctors.fields.department")}
      </AtomicText>
      <FlatList
        data={departments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: {
    padding: 16,
  },
  item: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
});
