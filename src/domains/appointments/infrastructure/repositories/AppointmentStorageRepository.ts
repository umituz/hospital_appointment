import { IStorageService } from "../../../storage/application/ports/IStorageService";
import { Appointment } from "../../types";

const STORAGE_KEY = "@hospital_appointment:appointments";

export class AppointmentStorageRepository {
  constructor(private readonly storageService: IStorageService) {}

  async getAll(): Promise<Appointment[]> {
    const appointments = await this.storageService.getItem<Appointment[]>(
      STORAGE_KEY,
      [],
    );
    return appointments || [];
  }

  async saveAll(appointments: Appointment[]): Promise<void> {
    const success = await this.storageService.setItem(
      STORAGE_KEY,
      appointments,
    );
    if (!success) {
      throw new Error("Failed to save appointments to storage");
    }
  }

  async getById(id: string): Promise<Appointment | null> {
    const appointments = await this.getAll();
    return appointments.find((a) => a.id === id) || null;
  }
}
