import { DoctorRepository } from '../repositories';
import { DoctorValidationService } from '../../utils/validation';
import { DoctorFormData } from '../../types';

export class DoctorService {
  private doctorRepository: DoctorRepository;

  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  async createDoctor(data: DoctorFormData, t: (key: string) => string): Promise<void> {
    const validation = DoctorValidationService.validateFormData(data, t);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    await this.doctorRepository.create(data);
  }

  async updateDoctor(id: string, data: Partial<DoctorFormData>, t: (key: string) => string): Promise<void> {
    const validation = DoctorValidationService.validateFormData(data as DoctorFormData, t);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    await this.doctorRepository.update(id, data);
  }

  async deleteDoctor(id: string): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}

