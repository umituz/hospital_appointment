import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateNumberRange,
  validatePositiveNumber,
  batchValidate,
} from "@umituz/react-native-validation";
import { DoctorFormData } from "../types";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class DoctorValidationService {
  static validateFormData(
    data: DoctorFormData,
    t: (key: string) => string,
  ): ValidationResult {
    const validations = [
      {
        field: "name",
        validator: () =>
          validateRequired(data.name, t("doctors.fields.name") || "Name"),
      },
      {
        field: "specialty",
        validator: () =>
          validateRequired(
            data.specialty,
            t("doctors.fields.specialty") || "Specialty",
          ),
      },
      {
        field: "department_id",
        validator: () =>
          validateRequired(
            data.department_id,
            t("doctors.fields.department") || "Department",
          ),
      },
    ];

    if (data.email && data.email.trim().length > 0) {
      validations.push({
        field: "email",
        validator: () => validateEmail(data.email),
      });
    }

    if (data.phone && data.phone.trim().length > 0) {
      validations.push({
        field: "phone",
        validator: () => validatePhone(data.phone),
      });
    }

    if (data.rating && data.rating.trim().length > 0) {
      const rating = parseFloat(data.rating);
      if (!isNaN(rating)) {
        validations.push({
          field: "rating",
          validator: () =>
            validateNumberRange(
              rating,
              0,
              5,
              t("doctors.fields.rating") || "Rating",
            ),
        });
      }
    }

    if (data.experience_years !== undefined) {
      validations.push({
        field: "experience_years",
        validator: () =>
          validatePositiveNumber(
            data.experience_years,
            t("doctors.fields.experienceYears") || "Experience Years",
          ),
      });
    }

    const result = batchValidate(validations);
    const errors = Object.values(result.errors).filter(Boolean);

    return {
      isValid: result.isValid,
      errors: errors.length > 0 ? errors : [],
    };
  }
}
