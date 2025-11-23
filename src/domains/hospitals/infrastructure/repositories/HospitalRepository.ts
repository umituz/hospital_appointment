import { Hospital, HospitalFormData } from "../../types";
import { IHospitalRepository } from "../../application/ports/IHospitalRepository";
import { IStorageService } from "../../../storage/application/ports/IStorageService";

const STORAGE_KEY = "@hospital_appointment:hospitals";
const MIGRATION_FLAG_KEY = "@hospital_appointment:hospitals_migrated";

const OLD_MOCK_HOSPITAL_IDS = ["1", "2", "3", "4"];

export class HospitalRepository implements IHospitalRepository {
  constructor(private readonly storageService: IStorageService) {}

  private async getAllFromStorage(): Promise<Hospital[]> {
    const hospitals = await this.storageService.getItem<Hospital[]>(
      STORAGE_KEY,
      [],
    );
    return hospitals || [];
  }

  private async saveToStorage(hospitals: Hospital[]): Promise<void> {
    const success = await this.storageService.setItem(STORAGE_KEY, hospitals);
    if (!success) {
      throw new Error("Failed to save hospitals to storage");
    }
  }

  private async isMigrated(): Promise<boolean> {
    const migrated = await this.storageService.getItem<boolean>(
      MIGRATION_FLAG_KEY,
      false,
    );
    return migrated === true;
  }

  private async markAsMigrated(): Promise<void> {
    const success = await this.storageService.setItem(MIGRATION_FLAG_KEY, true);
    if (!success) {
      throw new Error("Failed to mark hospitals as migrated");
    }
  }

  private async clearOldMockData(): Promise<void> {
    const hospitals = await this.getAllFromStorage();
    const hasOldMockData = hospitals.some((h) =>
      OLD_MOCK_HOSPITAL_IDS.includes(h.id),
    );

    if (hasOldMockData) {
      await this.saveToStorage([]);
      await this.markAsMigrated();
    }
  }

  async getAll(): Promise<Hospital[]> {
    const migrated = await this.isMigrated();
    if (!migrated) {
      await this.clearOldMockData();
    }
    return this.getAllFromStorage();
  }

  async getById(id: string): Promise<Hospital | null> {
    const hospitals = await this.getAllFromStorage();
    return hospitals.find((h) => h.id === id) || null;
  }

  async create(data: HospitalFormData): Promise<Hospital> {
    const hospitals = await this.getAllFromStorage();
    const newHospital: Hospital = {
      ...data,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    hospitals.push(newHospital);
    await this.saveToStorage(hospitals);
    return newHospital;
  }

  async update(id: string, data: Partial<HospitalFormData>): Promise<Hospital> {
    const hospitals = await this.getAllFromStorage();
    const index = hospitals.findIndex((h) => h.id === id);
    if (index === -1) {
      throw new Error("Hospital not found");
    }
    const updatedHospital: Hospital = {
      ...hospitals[index],
      ...data,
      id,
      updated_at: new Date().toISOString(),
    };
    hospitals[index] = updatedHospital;
    await this.saveToStorage(hospitals);
    return updatedHospital;
  }

  async delete(id: string): Promise<void> {
    const hospitals = await this.getAllFromStorage();
    const filtered = hospitals.filter((h) => h.id !== id);
    await this.saveToStorage(filtered);
  }

  async clearAll(): Promise<void> {
    await this.saveToStorage([]);
  }
}
