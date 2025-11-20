import { HospitalFormData } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class HospitalValidationService {
  static validateFormData(data: HospitalFormData, t: (key: string) => string): ValidationResult {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push(t('hospitals.validation.nameRequired'));
    }

    if (!data.address || data.address.trim().length === 0) {
      errors.push(t('hospitals.validation.addressRequired'));
    }

    if (data.email && data.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        errors.push(t('hospitals.validation.emailInvalid'));
      }
    }

    if (data.phone && data.phone.trim().length > 0) {
      const phoneRegex = /^[0-9+\s()-]+$/;
      if (!phoneRegex.test(data.phone)) {
        errors.push(t('hospitals.validation.phoneInvalid'));
      }
    }

    if (data.latitude !== undefined && (data.latitude < -90 || data.latitude > 90)) {
      errors.push(t('hospitals.validation.latitudeInvalid'));
    }

    if (data.longitude !== undefined && (data.longitude < -180 || data.longitude > 180)) {
      errors.push(t('hospitals.validation.longitudeInvalid'));
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

