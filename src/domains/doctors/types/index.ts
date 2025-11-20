export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department_id: string;
  phone?: string;
  email?: string;
  image?: string;
  rating?: string;
  experience_years?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DoctorFormData {
  name: string;
  specialty: string;
  department_id: string;
  phone: string;
  email: string;
  image: string;
  rating: string;
  experience_years: number;
  notes: string;
}

