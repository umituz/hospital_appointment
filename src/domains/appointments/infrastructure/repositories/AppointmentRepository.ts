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

  async create(data: Appointment | AppointmentFormData): Promise<Appointment> {
    const appointments = await this.storageRepository.getAll();

    // If data is already an Appointment, use it directly
    if ("id" in data && data.id) {
      appointments.push(data);
      await this.storageRepository.saveAll(appointments);
      return data;
    }

    // If data is AppointmentFormData, enrich it
    const relations = await this.enrichmentService.enrichWithRelations(
      data as AppointmentFormData,
    );
    const newAppointment: Appointment = {
      ...(data as AppointmentFormData),
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

  async update(
    id: string,
    data: Appointment | AppointmentFormData,
  ): Promise<Appointment> {
    const appointments = await this.storageRepository.getAll();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error("Appointment not found");
    }

    // If data is Appointment, use it directly
    if ("id" in data && data.id) {
      appointments[index] = data;
      await this.storageRepository.saveAll(appointments);
      return data;
    }

    // If data is AppointmentFormData, enrich it
    const relations = await this.enrichmentService.enrichWithRelations(
      data as AppointmentFormData,
    );
    const updatedAppointment: Appointment = {
      ...appointments[index],
      ...(data as AppointmentFormData),
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
