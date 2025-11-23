import React from "react";
import { View, StyleSheet } from "react-native";
import { AppointmentFormData } from "../../types";
import type { Hospital } from "@/domains/hospitals/types";
import type { Department } from "../../types";
import type { Doctor } from "@/domains/doctors/types";
import { HospitalPickerField } from "./HospitalPickerField";
import { DepartmentPickerField } from "./DepartmentPickerField";
import { DoctorPickerField } from "./DoctorPickerField";
import { DateTimeFields } from "./DateTimeFields";
import { PatientFields } from "./PatientFields";

interface AppointmentFormFieldsProps {
  formData: AppointmentFormData;
  hospitals: Hospital[];
  departments: Department[];
  doctors: Doctor[];
  showHospitalPicker: boolean;
  showDepartmentPicker: boolean;
  showDoctorPicker: boolean;
  onToggleHospitalPicker: () => void;
  onToggleDepartmentPicker: () => void;
  onToggleDoctorPicker: () => void;
  onUpdateField: (
    field: keyof AppointmentFormData,
    value: string | boolean | number,
  ) => void;
  onSelectHospital: (hospitalId: string) => void;
  onSelectDepartment: (departmentId: string) => void;
  onSelectDoctor: (doctorId: string) => void;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: Date) => void;
}

export const AppointmentFormFields: React.FC<AppointmentFormFieldsProps> = ({
  formData,
  hospitals,
  departments,
  doctors,
  showHospitalPicker,
  showDepartmentPicker,
  showDoctorPicker,
  onToggleHospitalPicker,
  onToggleDepartmentPicker,
  onToggleDoctorPicker,
  onUpdateField,
  onSelectHospital,
  onSelectDepartment,
  onSelectDoctor,
  onDateChange,
  onTimeChange,
}) => {
  return (
    <View style={styles.container}>
      <HospitalPickerField
        hospitals={hospitals}
        selectedHospitalId={formData.hospital_id}
        showPicker={showHospitalPicker}
        onTogglePicker={onToggleHospitalPicker}
        onSelectHospital={onSelectHospital}
      />

      {formData.hospital_id && (
        <DepartmentPickerField
          departments={departments}
          selectedDepartmentId={formData.department_id}
          showPicker={showDepartmentPicker}
          onTogglePicker={onToggleDepartmentPicker}
          onSelectDepartment={onSelectDepartment}
        />
      )}

      <DoctorPickerField
        doctors={doctors}
        selectedDoctorId={formData.doctor_id}
        showPicker={showDoctorPicker}
        onTogglePicker={onToggleDoctorPicker}
        onSelectDoctor={onSelectDoctor}
      />

      <DateTimeFields
        appointmentDate={formData.appointment_date}
        appointmentTime={formData.appointment_time}
        onDateChange={onDateChange}
        onTimeChange={onTimeChange}
      />

      <PatientFields
        patientName={formData.patient_name}
        patientPhone={formData.patient_phone}
        notes={formData.notes}
        onUpdateField={onUpdateField}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
