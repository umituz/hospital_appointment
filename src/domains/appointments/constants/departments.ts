import { Department } from "../types";

export const DEPARTMENT_NAMES = {
  CARDIOLOGY: "Cardiology",
  NEUROLOGY: "Neurology",
  ORTHOPEDICS: "Orthopedics",
  INTERNAL_MEDICINE: "Internal Medicine",
} as const;

export type DepartmentName =
  (typeof DEPARTMENT_NAMES)[keyof typeof DEPARTMENT_NAMES];

export const DEFAULT_DEPARTMENTS: Omit<Department, "id">[] = [
  { name: DEPARTMENT_NAMES.CARDIOLOGY, hospital_id: "1" },
  { name: DEPARTMENT_NAMES.NEUROLOGY, hospital_id: "1" },
  { name: DEPARTMENT_NAMES.ORTHOPEDICS, hospital_id: "1" },
  { name: DEPARTMENT_NAMES.INTERNAL_MEDICINE, hospital_id: "1" },
  { name: DEPARTMENT_NAMES.CARDIOLOGY, hospital_id: "2" },
  { name: DEPARTMENT_NAMES.NEUROLOGY, hospital_id: "2" },
  { name: DEPARTMENT_NAMES.ORTHOPEDICS, hospital_id: "2" },
  { name: DEPARTMENT_NAMES.INTERNAL_MEDICINE, hospital_id: "2" },
  { name: DEPARTMENT_NAMES.CARDIOLOGY, hospital_id: "3" },
  { name: DEPARTMENT_NAMES.NEUROLOGY, hospital_id: "3" },
  { name: DEPARTMENT_NAMES.ORTHOPEDICS, hospital_id: "3" },
  { name: DEPARTMENT_NAMES.INTERNAL_MEDICINE, hospital_id: "3" },
  { name: DEPARTMENT_NAMES.CARDIOLOGY, hospital_id: "4" },
  { name: DEPARTMENT_NAMES.NEUROLOGY, hospital_id: "4" },
  { name: DEPARTMENT_NAMES.ORTHOPEDICS, hospital_id: "4" },
  { name: DEPARTMENT_NAMES.INTERNAL_MEDICINE, hospital_id: "4" },
];

export const createSampleDepartments = (): Department[] => {
  return DEFAULT_DEPARTMENTS.map((dept, index) => ({
    ...dept,
    id: (index + 1).toString(),
  }));
};
