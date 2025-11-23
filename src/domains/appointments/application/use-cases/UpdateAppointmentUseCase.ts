import { Appointment } from "../../types";
import { IAppointmentRepository } from "../ports/IAppointmentRepository";
import { AppointmentValidationService } from "../../utils/validation";

export interface UpdateAppointmentInput {
  id: string;
  data: any; // AppointmentFormData
  t: (key: string) => string;
}

export interface UpdateAppointmentOutput {
  success: boolean;
  appointment?: Appointment;
  errors?: string[];
}

export class UpdateAppointmentUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(
    input: UpdateAppointmentInput,
  ): Promise<UpdateAppointmentOutput> {
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

      // Update appointment
      const appointment = await this.appointmentRepository.update(
        input.id,
        input.data,
      );

      return {
        success: true,
        appointment,
      };
    } catch (error) {
      throw new Error(
        `Failed to update appointment: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
