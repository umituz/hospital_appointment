import { Hospital, HospitalFormData } from "../../types";

export interface IHospitalRepository {
  getAll(): Promise<Hospital[]>;
  getById(id: string): Promise<Hospital | null>;
  create(data: HospitalFormData): Promise<Hospital>;
  update(id: string, data: Partial<HospitalFormData>): Promise<Hospital>;
  delete(id: string): Promise<void>;
  clearAll(): Promise<void>;
}
