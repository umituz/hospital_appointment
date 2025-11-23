import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicInput,
  AtomicTextArea,
} from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";

interface PatientFieldsProps {
  patientName: string;
  patientPhone: string;
  notes: string;
  onUpdateField: (
    field: "patient_name" | "patient_phone" | "notes",
    value: string,
  ) => void;
}

export const PatientFields: React.FC<PatientFieldsProps> = ({
  patientName,
  patientPhone,
  notes,
  onUpdateField,
}) => {
  const { t } = useLocalization();

  return (
    <>
      <AtomicInput
        label={t("appointments.fields.patientName")}
        placeholder={t("appointments.placeholders.enterPatientName")}
        value={patientName}
        onChangeText={(text: string) => onUpdateField("patient_name", text)}
        variant="outlined"
        style={styles.input}
      />

      <AtomicInput
        label={t("appointments.fields.patientPhone")}
        placeholder={t("appointments.placeholders.enterPatientPhone")}
        value={patientPhone}
        onChangeText={(text: string) => onUpdateField("patient_phone", text)}
        variant="outlined"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <AtomicTextArea
        label={t("appointments.fields.notes")}
        placeholder={t("appointments.placeholders.addNotes")}
        value={notes}
        onChangeText={(text: string) => onUpdateField("notes", text)}
        variant="outlined"
        style={styles.input}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});
