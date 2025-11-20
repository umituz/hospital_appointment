export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'missed';

export interface Appointment {
  id: string;
  hospital_id: string;
  department_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  patient_name: string;
  patient_phone?: string;
  notes?: string;
  reminder_enabled: boolean;
  reminder_time: number;
  status?: AppointmentStatus;
  hospital_name?: string;
  department_name?: string;
  doctor_name?: string;
  doctor_specialty?: string;
  doctor_image?: string;
  hospital_address?: string;
  hospital_phone?: string;
  latitude?: number;
  longitude?: number;
  rating?: string;
  experience_years?: number;
}

export interface AppointmentFormData {
  hospital_id: string;
  department_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  patient_name: string;
  patient_phone: string;
  notes: string;
  reminder_enabled: boolean;
  reminder_time: number;
}

export interface Department {
  id: string | number;
  name: string;
  hospital_id: string | number;
}

