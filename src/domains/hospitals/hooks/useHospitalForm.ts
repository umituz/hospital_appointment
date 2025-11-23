import { useState, useEffect, useCallback } from "react";
import { Hospital, HospitalFormData } from "../types";

const initialFormData: HospitalFormData = {
  name: "",
  address: "",
  phone: "",
  email: "",
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
