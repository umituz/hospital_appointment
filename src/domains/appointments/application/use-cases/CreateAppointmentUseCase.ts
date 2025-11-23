import { Appointment, AppointmentFormData } from "../../types";
import { IAppointmentRepository } from "../ports/IAppointmentRepository";
import { AppointmentValidationService } from "../../utils/validation";

export interface CreateAppointmentInput {
  data: AppointmentFormData;
  t: (key: string) => string;
}

export interface CreateAppointmentOutput {
  success: boolean;
  appointment?: Appointment;
  errors?: string[];
}

export class CreateAppointmentUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(
    input: CreateAppointmentInput,
  ): Promise<CreateAppointmentOutput> {
    try {
      // Validate input data
      const validation = AppointmentValidationService.validateFormData(
        input.data,
        input.t,
      );

      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors,
        };
      }

      // Create appointment with enriched data
      const appointment = await this.appointmentRepository.create(input.data);

      return {
        success: true,
        appointment,
      };
    } catch (error) {
      throw new Error(
        `Failed to create appointment: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
