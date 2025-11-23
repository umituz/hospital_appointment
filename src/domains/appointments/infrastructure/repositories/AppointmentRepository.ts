import { Appointment, AppointmentFormData } from "../../types";
import { AppointmentStorageRepository } from "./AppointmentStorageRepository";
import { AppointmentEnrichmentService } from "../services/AppointmentEnrichmentService";

export class AppointmentRepository {
  private storageRepository = new AppointmentStorageRepository();
  private enrichmentService = new AppointmentEnrichmentService();

  async getAll(): Promise<Appointment[]> {
    return this.storageRepository.getAll();
  }

  async getById(id: string): Promise<Appointment | null> {
    return this.storageRepository.getById(id);
  }

  async create(data: AppointmentFormData): Promise<Appointment> {
    const appointments = await this.storageRepository.getAll();
    const relations = await this.enrichmentService.enrichWithRelations(data);
    const newAppointment: Appointment = {
      ...data,
      ...relations,
      id: Date.now().toString(),
      status: "scheduled",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    appointments.push(newAppointment);
    await this.storageRepository.saveAll(appointments);
    return newAppointment;
  }

  async update(id: string, data: AppointmentFormData): Promise<Appointment> {
    const appointments = await this.storageRepository.getAll();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error("Appointment not found");
    }
    const relations = await this.enrichmentService.enrichWithRelations(data);
    const updatedAppointment: Appointment = {
      ...appointments[index],
      ...data,
      ...relations,
      id,
      updated_at: new Date().toISOString(),
    };
    appointments[index] = updatedAppointment;
    await this.storageRepository.saveAll(appointments);
    return updatedAppointment;
  }

  async delete(id: string): Promise<void> {
    const appointments = await this.storageRepository.getAll();
    const filtered = appointments.filter((a) => a.id !== id);
    await this.storageRepository.saveAll(filtered);
  }
}
