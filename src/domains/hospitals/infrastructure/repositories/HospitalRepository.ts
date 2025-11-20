import { Hospital, HospitalFormData } from '../../types';
import { storageService } from '../../../storage/infrastructure/services';

const STORAGE_KEY = '@hospital_appointment:hospitals';

const SAMPLE_HOSPITALS: Hospital[] = [
  {
    id: '1',
    name: 'Ankara Şehir Hastanesi',
    address: 'Bilkent, Ankara',
    phone: '+90 312 123 45 67',
    latitude: 39.9334,
    longitude: 32.8597,
  },
  {
    id: '2',
    name: 'İstanbul Üniversitesi Tıp Fakültesi',
    address: 'Çapa, İstanbul',
    phone: '+90 212 123 45 67',
    latitude: 41.0082,
    longitude: 28.9784,
  },
  {
    id: '3',
    name: 'Acıbadem Maslak Hastanesi',
    address: 'Maslak, İstanbul',
    phone: '+90 212 123 45 68',
    latitude: 41.1085,
    longitude: 29.0205,
  },
  {
    id: '4',
    name: 'Memorial Şişli Hastanesi',
    address: 'Şişli, İstanbul',
    phone: '+90 212 123 45 69',
    latitude: 41.0602,
    longitude: 28.9874,
  },
];

export class HospitalRepository {
  private async getAllFromStorage(): Promise<Hospital[]> {
    const hospitals = await storageService.getItem<Hospital[]>(STORAGE_KEY, []);
    return hospitals || [];
  }

  private async saveToStorage(hospitals: Hospital[]): Promise<void> {
    await storageService.setItem(STORAGE_KEY, hospitals);
  }

  async getAll(): Promise<Hospital[]> {
    const stored = await this.getAllFromStorage();
    if (stored.length === 0) {
      await this.saveToStorage(SAMPLE_HOSPITALS);
      return SAMPLE_HOSPITALS;
    }
    return stored;
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
      throw new Error('Hospital not found');
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
}

