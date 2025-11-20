import { DoctorFormData } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class DoctorValidationService {
  static validateFormData(data: DoctorFormData, t: (key: string) => string): ValidationResult {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push(t('doctors.validation.nameRequired'));
    }

    if (!data.specialty || data.specialty.trim().length === 0) {
      errors.push(t('doctors.validation.specialtyRequired'));
    }

    if (!data.department_id || data.department_id.trim().length === 0) {
      errors.push(t('doctors.validation.departmentRequired'));
    }

    if (data.email && data.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        errors.push(t('doctors.validation.emailInvalid'));
      }
    }

    if (data.phone && data.phone.trim().length > 0) {
      const phoneRegex = /^[0-9+\s()-]+$/;
      if (!phoneRegex.test(data.phone)) {
        errors.push(t('doctors.validation.phoneInvalid'));
      }
    }

    if (data.rating && data.rating.trim().length > 0) {
      const rating = parseFloat(data.rating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        errors.push(t('doctors.validation.ratingInvalid'));
      }
    }

    if (data.experience_years && data.experience_years < 0) {
      errors.push(t('doctors.validation.experienceInvalid'));
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

