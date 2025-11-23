import {
  validateRequired,
  validateName,
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
            t("appointments.fields.hospital"),
          ),
      },
      {
        field: "department_id",
        validator: () =>
          validateRequired(
            formData.department_id,
            t("appointments.fields.department"),
          ),
      },
      {
        field: "appointment_date",
        validator: () =>
          validateRequired(
            formData.appointment_date,
            t("appointments.fields.date"),
          ),
      },
      {
        field: "appointment_time",
        validator: () =>
          validateRequired(
            formData.appointment_time,
            t("appointments.fields.time"),
          ),
      },
      {
        field: "patient_name",
        validator: () =>
          validateName(
            formData.patient_name,
            t("appointments.fields.patientName"),
          ),
      },
    ];

    if (formData.appointment_date) {
      validations.push({
        field: "appointment_date_format",
        validator: () =>
          AppointmentValidationService.validateDate(formData.appointment_date)
            ? { isValid: true }
            : {
                isValid: false,
                error: t("appointments.validation.dateInvalid"),
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
                error: t("appointments.validation.timeInvalid"),
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
