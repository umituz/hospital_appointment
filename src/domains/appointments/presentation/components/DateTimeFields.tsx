import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system";
import { AtomicDatePicker } from "@umituz/react-native-design-system-atoms";
import { useLocalization } from "@umituz/react-native-localization";

interface DateTimeFieldsProps {
  appointmentDate: string;
  appointmentTime: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: Date) => void;
}

export const DateTimeFields: React.FC<DateTimeFieldsProps> = ({
  appointmentDate,
  appointmentTime,
  onDateChange,
  onTimeChange,
}) => {
  const { t } = useLocalization();

  // Parse date string to Date object for AtomicDatePicker
  const parseDateString = (dateString: string): Date | null => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  // Parse time string to Date object for AtomicDatePicker
  const parseTimeString = (timeString: string): Date | null => {
    if (!timeString) return null;
    // Create a date with the time component
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  return (
    <>
      <AtomicDatePicker
        label={`${t("appointments.fields.date")} *`}
        value={parseDateString(appointmentDate)}
        onChange={onDateChange}
        mode="date"
        placeholder={t("appointments.placeholders.selectDate")}
        minimumDate={new Date()} // Don't allow past dates
      />

      <AtomicDatePicker
        label={`${t("appointments.fields.time")} *`}
        value={parseTimeString(appointmentTime)}
        onChange={onTimeChange}
        mode="time"
        placeholder={t("appointments.placeholders.selectTime")}
      />
    </>
  );
};

// Styles are now handled by AtomicDatePicker component
