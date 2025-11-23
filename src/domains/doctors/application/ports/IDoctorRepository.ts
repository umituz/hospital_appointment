import { Doctor, DoctorFormData } from "../../types";

export interface IDoctorRepository {
  getAll(): Promise<Doctor[]>;
  getById(id: string): Promise<Doctor | null>;
  getByDepartmentId(departmentId: string): Promise<Doctor[]>;
  create(data: DoctorFormData): Promise<Doctor>;
  update(id: string, data: Partial<DoctorFormData>): Promise<Doctor>;
  delete(id: string): Promise<void>;
}
