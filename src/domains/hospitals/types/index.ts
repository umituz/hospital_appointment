export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface HospitalFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  notes: string;
}

export const getGoogleMapsUrl = (address: string): string => {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};
