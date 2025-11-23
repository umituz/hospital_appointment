import {
  validateRequired,
  validateName,
  validatePhone,
  validatePattern,
  batchValidate,
} from "@umituz/react-native-validation";
import { AppointmentFormData } from "../types";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class AppointmentValidationService {
  static validateFormData(
    formData: AppointmentFormData,
    t: (key: string) => string,
  ): ValidationResult {
    const validations = [
      {
        field: "hospital_id",
        validator: () =>
          validateRequired(
            formData.hospital_id,
            t("appointments.fields.hospital") || "Hospital",
          ),
      },
      {
        field: "department_id",
        validator: () =>
          validateRequired(
            formData.department_id,
            t("appointments.fields.department") || "Department",
          ),
      },
      {
        field: "doctor_id",
        validator: () =>
          validateRequired(
            formData.doctor_id,
            t("appointments.fields.doctor") || "Doctor",
          ),
      },
      {
        field: "appointment_date",
        validator: () =>
          validateRequired(
            formData.appointment_date,
            t("appointments.fields.date") || "Date",
          ),
      },
      {
        field: "appointment_time",
        validator: () =>
          validateRequired(
            formData.appointment_time,
            t("appointments.fields.time") || "Time",
          ),
      },
      {
        field: "patient_name",
        validator: () =>
          validateName(
            formData.patient_name,
            t("appointments.fields.patientName") || "Patient Name",
          ),
      },
    ];

    if (formData.patient_phone && formData.patient_phone.trim().length > 0) {
      validations.push({
        field: "patient_phone",
        validator: () => validatePhone(formData.patient_phone),
      });
    }

    if (formData.appointment_date) {
      validations.push({
        field: "appointment_date_format",
        validator: () =>
          AppointmentValidationService.validateDate(formData.appointment_date)
            ? { isValid: true }
            : {
                isValid: false,
                error:
                  t("appointments.validation.dateInvalid") ||
                  "Invalid date format",
              },
      });
    }

    if (formData.appointment_time) {
      validations.push({
        field: "appointment_time_format",
        validator: () =>
          AppointmentValidationService.validateTime(formData.appointment_time)
            ? { isValid: true }
            : {
                isValid: false,
                error:
                  t("appointments.validation.timeInvalid") ||
                  "Invalid time format",
              },
      });
    }

    const result = batchValidate(validations);
    const errors = Object.values(result.errors).filter(Boolean);

    return {
      isValid: result.isValid,
      errors: errors.length > 0 ? errors : [],
    };
  }

  static validateDate(dateString: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  static validateTime(timeString: string): boolean {
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(timeString)) {
      return false;
    }
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  }
}
