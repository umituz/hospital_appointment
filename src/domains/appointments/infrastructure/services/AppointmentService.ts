import { AppointmentRepository } from '../repositories';
import { AppointmentValidationService } from '../../utils/validation';
import { AppointmentFormData } from '../../types';

export class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  async createAppointment(data: AppointmentFormData, t: (key: string) => string): Promise<void> {
    const validation = AppointmentValidationService.validateFormData(data, t);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    await this.appointmentRepository.create(data);
  }

  async updateAppointment(id: string, data: AppointmentFormData, t: (key: string) => string): Promise<void> {
    const validation = AppointmentValidationService.validateFormData(data, t);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    await this.appointmentRepository.update(id, data);
  }

  async deleteAppointment(id: string): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}

