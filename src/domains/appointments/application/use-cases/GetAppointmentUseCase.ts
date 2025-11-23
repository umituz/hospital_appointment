import { Appointment } from "../../types";
import { IAppointmentRepository } from "../ports/IAppointmentRepository";

export interface GetAppointmentInput {
  id: string;
}

export interface GetAppointmentOutput {
  success: boolean;
  appointment: Appointment | null;
}

export class GetAppointmentUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(input: GetAppointmentInput): Promise<GetAppointmentOutput> {
    try {
      const appointment = await this.appointmentRepository.getById(input.id);

      return {
        success: true,
        appointment,
      };
    } catch (error) {
      throw new Error(
        `Failed to get appointment: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
