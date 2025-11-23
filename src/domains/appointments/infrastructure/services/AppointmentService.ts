import { AppointmentRepository } from "../repositories";
import { AppointmentEnrichmentService } from "./AppointmentEnrichmentService";
import { AppointmentValidationService } from "../../utils/validation";
import { AppointmentFormData, Appointment } from "../../types";
import { storageService } from "../../../storage/infrastructure/services";

export class AppointmentService {
  private appointmentRepository: AppointmentRepository;
  private enrichmentService: AppointmentEnrichmentService;

  constructor() {
    this.appointmentRepository = new AppointmentRepository(storageService);
    this.enrichmentService = new AppointmentEnrichmentService();
  }

  async createAppointment(
    data: AppointmentFormData,
    t: (key: string) => string,
  ): Promise<Appointment> {
    const validation = AppointmentValidationService.validateFormData(data, t);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    return await this.appointmentRepository.create(data);
  }

  async updateAppointment(
    id: string,
    data: AppointmentFormData,
    t: (key: string) => string,
  ): Promise<Appointment> {
    const validation = AppointmentValidationService.validateFormData(data, t);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    return await this.appointmentRepository.update(id, data);
  }

  async deleteAppointment(id: string): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}
