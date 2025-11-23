import { useState, useEffect, useCallback } from "react";
import { Hospital, HospitalFormData } from "../types";

const initialFormData: HospitalFormData = {
  name: "",
  address: "",
  phone: "",
  email: "",
  latitude: 0,
  longitude: 0,
  notes: "",
};

export function useHospitalForm(hospital?: Hospital) {
  const [formData, setFormData] = useState<HospitalFormData>(initialFormData);

  useEffect(() => {
    if (hospital) {
      setFormData({
        name: hospital.name || "",
        address: hospital.address || "",
        phone: hospital.phone || "",
        email: hospital.email || "",
        latitude: hospital.latitude || 0,
        longitude: hospital.longitude || 0,
        notes: hospital.notes || "",
      });
    }
  }, [hospital]);

  const updateFormData = useCallback(
    (field: keyof HospitalFormData, value: string | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  return {
    formData,
    updateFormData,
    resetForm,
  };
}
