import { HospitalRepository } from '../repositories';
import { HospitalValidationService } from '../../utils/validation';
import { HospitalFormData } from '../../types';

export class HospitalService {
  private hospitalRepository: HospitalRepository;

  constructor() {
    this.hospitalRepository = new HospitalRepository();
  }

  async createHospital(data: HospitalFormData, t: (key: string) => string): Promise<void> {
    const validation = HospitalValidationService.validateFormData(data, t);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    await this.hospitalRepository.create(data);
  }

  async updateHospital(id: string, data: Partial<HospitalFormData>, t: (key: string) => string): Promise<void> {
    const validation = HospitalValidationService.validateFormData(data as HospitalFormData, t);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    await this.hospitalRepository.update(id, data);
  }

  async deleteHospital(id: string): Promise<void> {
    await this.hospitalRepository.delete(id);
  }
}

