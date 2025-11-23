import { Appointment } from "../../types";
import { IAppointmentRepository } from "../ports/IAppointmentRepository";

export interface GetAppointmentsInput {
  // No input parameters for now
}

export interface GetAppointmentsOutput {
  success: boolean;
  appointments: Appointment[];
}

export class GetAppointmentsUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(_input: GetAppointmentsInput): Promise<GetAppointmentsOutput> {
    try {
      const appointments = await this.appointmentRepository.getAll();

      return {
        success: true,
        appointments,
      };
    } catch (error) {
      throw new Error(
        `Failed to get appointments: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
