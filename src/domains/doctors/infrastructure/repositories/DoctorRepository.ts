import { Doctor, DoctorFormData } from '../../types';
import { storageService } from '../../../storage/infrastructure/services';

const STORAGE_KEY = '@hospital_appointment:doctors';

export class DoctorRepository {
  private async getAllFromStorage(): Promise<Doctor[]> {
    const doctors = await storageService.getItem<Doctor[]>(STORAGE_KEY, []);
    return doctors || [];
  }

  private async saveToStorage(doctors: Doctor[]): Promise<void> {
    await storageService.setItem(STORAGE_KEY, doctors);
  }

  async getAll(): Promise<Doctor[]> {
    return this.getAllFromStorage();
  }

  async getById(id: string): Promise<Doctor | null> {
    const doctors = await this.getAllFromStorage();
    return doctors.find((d) => d.id === id) || null;
  }

  async getByDepartmentId(departmentId: string | number): Promise<Doctor[]> {
    const doctors = await this.getAllFromStorage();
    return doctors.filter((d) => d.department_id.toString() === departmentId.toString());
  }

  async create(data: DoctorFormData): Promise<Doctor> {
    const doctors = await this.getAllFromStorage();
    const newDoctor: Doctor = {
      ...data,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    doctors.push(newDoctor);
    await this.saveToStorage(doctors);
    return newDoctor;
  }

  async update(id: string, data: Partial<DoctorFormData>): Promise<Doctor> {
    const doctors = await this.getAllFromStorage();
    const index = doctors.findIndex((d) => d.id === id);
    if (index === -1) {
      throw new Error('Doctor not found');
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
  }

  async delete(id: string): Promise<void> {
    const doctors = await this.getAllFromStorage();
    const filtered = doctors.filter((d) => d.id !== id);
    await this.saveToStorage(filtered);
  }
}

