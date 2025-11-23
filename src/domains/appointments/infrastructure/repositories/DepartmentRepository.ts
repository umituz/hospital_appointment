import { Department } from "../../types";
import { storageService } from "../../../storage/infrastructure/services";
import { createSampleDepartments, DEPARTMENT_NAMES } from "../../constants";

const STORAGE_KEY = "@hospital_appointment:departments";

const TURKISH_TO_ENGLISH_MAP: Record<string, string> = {
  Kardiyoloji: DEPARTMENT_NAMES.CARDIOLOGY,
  Nöroloji: DEPARTMENT_NAMES.NEUROLOGY,
  Ortopedi: DEPARTMENT_NAMES.ORTHOPEDICS,
  Dahiliye: DEPARTMENT_NAMES.INTERNAL_MEDICINE,
};

const migrateDepartmentName = (name: string): string => {
  return TURKISH_TO_ENGLISH_MAP[name] || name;
};

const migrateDepartments = (departments: Department[]): Department[] => {
  return departments.map((dept) => ({
    ...dept,
    name: migrateDepartmentName(dept.name),
  }));
};

export class DepartmentRepository {
  private async getAllFromStorage(): Promise<Department[]> {
    const stored = await storageService.getItem<Department[]>(STORAGE_KEY, []);
    if (!stored || stored.length === 0) {
      const sampleDepartments = createSampleDepartments();
      await storageService.setItem(STORAGE_KEY, sampleDepartments);
      return sampleDepartments;
    }

    const needsMigration = stored.some((dept) =>
      Object.keys(TURKISH_TO_ENGLISH_MAP).includes(dept.name),
    );

    if (needsMigration) {
      const migrated = migrateDepartments(stored);
      await storageService.setItem(STORAGE_KEY, migrated);
      return migrated;
    }

    return stored;
  }

  async getAll(): Promise<Department[]> {
    return this.getAllFromStorage();
  }

  async getByHospitalId(hospitalId: string): Promise<Department[]> {
    const allDepartments = await this.getAllFromStorage();
    const filtered = allDepartments.filter(
      (d) => d.hospital_id.toString() === hospitalId.toString(),
    );

    if (filtered.length === 0) {
      const allHospitals = await this.getAllHospitals();
      const hospitalExists = allHospitals.some(
        (h) => h.id.toString() === hospitalId.toString(),
      );

      if (hospitalExists) {
        const defaultDepartments =
          this.createDepartmentsForHospital(hospitalId);
        const updated = [...allDepartments, ...defaultDepartments];
        await this.saveToStorage(updated);
        return defaultDepartments;
      }
    }

    return filtered;
  }

  private async getAllHospitals() {
    const { HospitalRepository } = await import(
      "../../../hospitals/infrastructure/repositories"
    );
    const hospitalRepo = new HospitalRepository();
    return hospitalRepo.getAll();
  }

  private createDepartmentsForHospital(hospitalId: string): Department[] {
    const allDepartmentNames = Object.values(DEPARTMENT_NAMES);
    const timestamp = Date.now();

    return allDepartmentNames.map((name, index) => ({
      id: `${hospitalId}-${name}-${timestamp}-${index}`,
      name: name as string,
      hospital_id: hospitalId,
    }));
  }

  private async saveToStorage(departments: Department[]): Promise<void> {
    await storageService.setItem(STORAGE_KEY, departments);
  }
}
