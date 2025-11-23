import { IHospitalRepository } from "../ports/IHospitalRepository";

export interface DeleteHospitalInput {
  id: string;
}

export interface DeleteHospitalOutput {
  success: boolean;
}

export class DeleteHospitalUseCase {
  constructor(private readonly hospitalRepository: IHospitalRepository) {}

  async execute(input: DeleteHospitalInput): Promise<DeleteHospitalOutput> {
    try {
      await this.hospitalRepository.delete(input.id);

      return {
        success: true,
      };
    } catch (error) {
      throw new Error(
        `Failed to delete hospital: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
