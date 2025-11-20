import { AppointmentFormData } from '../types';
import { useLocalization } from '@umituz/react-native-localization';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class AppointmentValidationService {
  static validateFormData(formData: AppointmentFormData, t: (key: string) => string): ValidationResult {
    const errors: string[] = [];

    if (!formData.hospital_id) {
      errors.push(t('appointments.validation.hospitalRequired'));
    }

    if (!formData.department_id) {
      errors.push(t('appointments.validation.departmentRequired'));
    }

    if (!formData.doctor_id) {
      errors.push(t('appointments.validation.doctorRequired'));
    }

    if (!formData.appointment_date) {
      errors.push(t('appointments.validation.dateRequired'));
    }

    if (!formData.appointment_time) {
      errors.push(t('appointments.validation.timeRequired'));
    }

    if (!formData.patient_name?.trim()) {
      errors.push(t('appointments.validation.patientNameRequired'));
    }

    return {
      isValid: errors.length === 0,
      errors,
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
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  }
}

