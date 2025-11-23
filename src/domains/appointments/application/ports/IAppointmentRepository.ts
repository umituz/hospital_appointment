import { Appointment, AppointmentFormData } from "../../types";

export interface IAppointmentRepository {
  getAll(): Promise<Appointment[]>;
  getById(id: string): Promise<Appointment | null>;
  create(data: AppointmentFormData): Promise<Appointment>;
  update(id: string, data: AppointmentFormData): Promise<Appointment>;
  delete(id: string): Promise<void>;
}
