import { Appointment, AppointmentFormData } from "../../types";
import { IAppointmentRepository } from "../../application/ports/IAppointmentRepository";
import { IStorageService } from "../../../storage/application/ports/IStorageService";
import { AppointmentStorageRepository } from "./AppointmentStorageRepository";

export class AppointmentRepository implements IAppointmentRepository {
  private readonly storageRepository: AppointmentStorageRepository;

  constructor(storageService: IStorageService) {
    this.storageRepository = new AppointmentStorageRepository(storageService);
  }

  async getAll(): Promise<Appointment[]> {
    return this.storageRepository.getAll();
  }

  async getById(id: string): Promise<Appointment | null> {
    return this.storageRepository.getById(id);
  }

  async create(data: AppointmentFormData): Promise<Appointment> {
    const appointments = await this.storageRepository.getAll();

    const newAppointment: Appointment = {
      ...data,
      hospital_name: "", // Relations will be populated by UI if needed
      department_name: "",
      doctor_name: "",
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

    const updatedAppointment: Appointment = {
      ...appointments[index],
      ...data,
      hospital_name: "", // Relations will be populated by UI if needed
      department_name: "",
      doctor_name: "",
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
