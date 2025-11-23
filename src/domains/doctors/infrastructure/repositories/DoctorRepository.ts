import { Doctor, DoctorFormData } from "../../types";
import { IDoctorRepository } from "../../application/ports/IDoctorRepository";
import { IStorageService } from "../../../storage/application/ports/IStorageService";

const STORAGE_KEY = "@hospital_appointment:doctors";

export class DoctorRepository implements IDoctorRepository {
  constructor(private readonly storageService: IStorageService) {}

  private async getAllFromStorage(): Promise<Doctor[]> {
    const doctors = await this.storageService.getItem<Doctor[]>(
      STORAGE_KEY,
      [],
    );
    return doctors || [];
  }

  private async saveToStorage(doctors: Doctor[]): Promise<void> {
    const success = await this.storageService.setItem(STORAGE_KEY, doctors);
    if (!success) {
      throw new Error("Failed to save doctors to storage");
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async getAll(): Promise<Doctor[]> {
    try {
      return await this.getAllFromStorage();
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__)
        console.error("[DoctorRepository] Error getting all doctors:", error);
      throw new Error("Failed to fetch doctors");
    }
  }

  async getById(id: string): Promise<Doctor | null> {
    try {
      if (!id) {
        return null;
      }
      const doctors = await this.getAllFromStorage();
      return doctors.find((d) => d.id === id) || null;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__)
        console.error("[DoctorRepository] Error getting doctor by id:", error);
      throw new Error("Failed to fetch doctor");
    }
  }

  async getByDepartmentId(departmentId: string): Promise<Doctor[]> {
    try {
      if (!departmentId) {
        return [];
      }
      const doctors = await this.getAllFromStorage();
      return doctors.filter((d) => d.department_id === departmentId);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__)
        console.error(
          "[DoctorRepository] Error getting doctors by department:",
          error,
        );
      throw new Error("Failed to fetch doctors by department");
    }
  }

  async create(data: DoctorFormData): Promise<Doctor> {
    const doctors = await this.getAllFromStorage();
    const newDoctor: Doctor = {
      ...data,
      id: this.generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    doctors.push(newDoctor);
    await this.saveToStorage(doctors);
    return newDoctor;
  }

  async update(id: string, data: Partial<DoctorFormData>): Promise<Doctor> {
    try {
      if (!id) {
        throw new Error("Doctor ID is required");
      }
      const doctors = await this.getAllFromStorage();
      const index = doctors.findIndex((d) => d.id === id);
      if (index === -1) {
        throw new Error("Doctor not found");
      }
      const updatedDoctor: Doctor = {
        ...doctors[index],
        ...data,
        id,
        updated_at: new Date().toISOString(),
      };
      doctors[index] = updatedDoctor;
      await this.saveToStorage(doctors);
      return updatedDoctor;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__)
        console.error("[DoctorRepository] Error updating doctor:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update doctor");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error("Doctor ID is required");
      }
      const doctors = await this.getAllFromStorage();
      const filtered = doctors.filter((d) => d.id !== id);
      if (filtered.length === doctors.length) {
        throw new Error("Doctor not found");
      }
      await this.saveToStorage(filtered);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__)
        console.error("[DoctorRepository] Error deleting doctor:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to delete doctor");
    }
  }
}
