import { IAppointmentRepository } from "../ports/IAppointmentRepository";

export interface DeleteAppointmentInput {
  id: string;
}

export interface DeleteAppointmentOutput {
  success: boolean;
}

export class DeleteAppointmentUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(
    input: DeleteAppointmentInput,
  ): Promise<DeleteAppointmentOutput> {
    try {
      await this.appointmentRepository.delete(input.id);

      return {
        success: true,
      };
    } catch (error) {
      throw new Error(
        `Failed to delete appointment: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
