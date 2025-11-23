import { useState, useEffect, useCallback } from "react";
import { AppointmentFormData, Appointment } from "../types";

const initialFormData: AppointmentFormData = {
  hospital_id: "",
  department_id: "",
  doctor_id: "",
  appointment_date: "",
  appointment_time: "",
  patient_name: "",
  patient_phone: "",
  notes: "",
};

export function useAppointmentForm(appointment?: Appointment) {
  const [formData, setFormData] =
    useState<AppointmentFormData>(initialFormData);
  const [showHospitalPicker, setShowHospitalPicker] = useState(false);
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);
  const [showDoctorPicker, setShowDoctorPicker] = useState(false);

  useEffect(() => {
    if (appointment) {
      setFormData({
        hospital_id: appointment.hospital_id?.toString() || "",
        department_id: appointment.department_id?.toString() || "",
        doctor_id: appointment.doctor_id?.toString() || "",
        appointment_date: appointment.appointment_date || "",
        appointment_time: appointment.appointment_time || "",
        patient_name: appointment.patient_name || "",
        patient_phone: appointment.patient_phone || "",
        notes: appointment.notes || "",
      });
    }
  }, [appointment]);

  const updateFormData = useCallback(
    (field: keyof AppointmentFormData, value: string | boolean | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleDateChange = useCallback(
    (date: Date) => {
      // Format date as YYYY-MM-DD string
      const dateString = date.toISOString().split("T")[0];
      updateFormData("appointment_date", dateString);
    },
    [updateFormData],
  );

  const handleTimeChange = useCallback(
    (time: Date) => {
      // Format time as HH:MM string
      const timeString = time.toTimeString().slice(0, 5);
      updateFormData("appointment_time", timeString);
    },
    [updateFormData],
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  return {
    formData,
    updateFormData,
    resetForm,
    showHospitalPicker,
    setShowHospitalPicker,
    showDepartmentPicker,
    setShowDepartmentPicker,
    showDoctorPicker,
    setShowDoctorPicker,
    handleDateChange,
    handleTimeChange,
  };
}
