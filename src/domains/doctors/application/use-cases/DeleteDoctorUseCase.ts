import { IDoctorRepository } from "../ports/IDoctorRepository";

export interface DeleteDoctorInput {
  id: string;
}

export interface DeleteDoctorOutput {
  success: boolean;
}

export class DeleteDoctorUseCase {
  constructor(private readonly doctorRepository: IDoctorRepository) {}

  async execute(input: DeleteDoctorInput): Promise<DeleteDoctorOutput> {
    try {
      await this.doctorRepository.delete(input.id);

      return {
        success: true,
      };
    } catch (error) {
      throw new Error(
        `Failed to delete doctor: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
