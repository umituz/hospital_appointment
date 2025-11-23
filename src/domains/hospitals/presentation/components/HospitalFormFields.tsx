import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicInput,
  AtomicTextArea,
} from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";
import { HospitalFormData } from "../../types";

interface HospitalFormFieldsProps {
  formData: HospitalFormData;
  onUpdateField: (
    field: keyof HospitalFormData,
    value: string | number,
  ) => void;
}

export const HospitalFormFields: React.FC<HospitalFormFieldsProps> = ({
  formData,
  onUpdateField,
}) => {
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <AtomicInput
        label={t("hospitals.fields.name")}
        placeholder={t("hospitals.placeholders.name") || "Enter hospital name"}
        value={formData.name}
        onChangeText={(text: string) => onUpdateField("name", text)}
        variant="outlined"
        style={styles.input}
      />

      <AtomicInput
        label={t("hospitals.fields.address")}
        placeholder={t("hospitals.placeholders.address") || "Enter address"}
        value={formData.address}
        onChangeText={(text: string) => onUpdateField("address", text)}
        variant="outlined"
        style={styles.input}
      />

      <AtomicInput
        label={t("hospitals.fields.phone")}
        placeholder={t("hospitals.placeholders.phone") || "Enter phone number"}
        value={formData.phone}
        onChangeText={(text: string) => onUpdateField("phone", text)}
        variant="outlined"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <AtomicInput
        label={t("hospitals.fields.email")}
        placeholder={t("hospitals.placeholders.email") || "Enter email address"}
        value={formData.email}
        onChangeText={(text: string) => onUpdateField("email", text)}
        variant="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <AtomicInput
        label={t("hospitals.fields.latitude")}
        placeholder={t("hospitals.placeholders.latitude") || "Enter latitude"}
        value={formData.latitude.toString()}
        onChangeText={(text: string) =>
          onUpdateField("latitude", parseFloat(text) || 0)
        }
        variant="outlined"
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <AtomicInput
        label={t("hospitals.fields.longitude")}
        placeholder={t("hospitals.placeholders.longitude") || "Enter longitude"}
        value={formData.longitude.toString()}
        onChangeText={(text: string) =>
          onUpdateField("longitude", parseFloat(text) || 0)
        }
        variant="outlined"
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <AtomicTextArea
        label={t("hospitals.fields.notes")}
        placeholder={t("hospitals.placeholders.notes") || "Additional notes"}
        value={formData.notes}
        onChangeText={(text: string) => onUpdateField("notes", text)}
        variant="outlined"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 20,
  },
});
