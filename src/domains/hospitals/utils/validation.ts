import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateNumberRange,
  batchValidate,
} from "@umituz/react-native-validation";
import { HospitalFormData } from "../types";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class HospitalValidationService {
  static validateFormData(
    data: HospitalFormData,
    t: (key: string) => string,
  ): ValidationResult {
    const validations = [
      {
        field: "name",
        validator: () =>
          validateRequired(data.name, t("hospitals.fields.name") || "Name"),
      },
      {
        field: "address",
        validator: () =>
          validateRequired(
            data.address,
            t("hospitals.fields.address") || "Address",
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

    if (data.latitude !== undefined) {
      validations.push({
        field: "latitude",
        validator: () =>
          validateNumberRange(
            data.latitude,
            -90,
            90,
            t("hospitals.fields.latitude") || "Latitude",
          ),
      });
    }

    if (data.longitude !== undefined) {
      validations.push({
        field: "longitude",
        validator: () =>
          validateNumberRange(
            data.longitude,
            -180,
            180,
            t("hospitals.fields.longitude") || "Longitude",
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
