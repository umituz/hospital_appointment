import { Appointment } from "../../types";
import { storageService } from "../../../storage/infrastructure/services";

const STORAGE_KEY = "@hospital_appointment:appointments";

export class AppointmentStorageRepository {
  async getAll(): Promise<Appointment[]> {
    const appointments = await storageService.getItem<Appointment[]>(
      STORAGE_KEY,
      [],
    );
    return appointments || [];
  }

  async saveAll(appointments: Appointment[]): Promise<void> {
    await storageService.setItem(STORAGE_KEY, appointments);
  }

  async getById(id: string): Promise<Appointment | null> {
    const appointments = await this.getAll();
    return appointments.find((a) => a.id === id) || null;
  }
}
