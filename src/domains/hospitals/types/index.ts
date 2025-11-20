export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface HospitalFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  notes: string;
}

