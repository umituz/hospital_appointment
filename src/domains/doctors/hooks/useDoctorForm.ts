import { useState, useEffect, useCallback } from "react";
import { Doctor, DoctorFormData } from "../types";

const initialFormData: DoctorFormData = {
  name: "",
  specialty: "",
  department_id: "",
  phone: "",
  email: "",
  image: "",
  rating: "",
  experience_years: 0,
  notes: "",
};

export function useDoctorForm(doctor?: Doctor) {
  const [formData, setFormData] = useState<DoctorFormData>(initialFormData);

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || "",
        specialty: doctor.specialty || "",
        department_id: doctor.department_id || "",
        phone: doctor.phone || "",
        email: doctor.email || "",
        image: doctor.image || "",
        rating: doctor.rating || "",
        experience_years: doctor.experience_years || 0,
        notes: doctor.notes || "",
      });
    }
  }, [doctor]);

  const updateFormData = useCallback(
    (field: keyof DoctorFormData, value: string | number) => {
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
