import {
  validateRequired,
  validateEmail,
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

    const result = batchValidate(validations);
    const errors = Object.values(result.errors).filter(Boolean);

    return {
      isValid: result.isValid,
      errors: errors.length > 0 ? errors : [],
    };
  }
}
