import { Hospital } from "../../types";
import { IHospitalRepository } from "../ports/IHospitalRepository";

export interface GetHospitalInput {
  id: string;
}

export interface GetHospitalOutput {
  success: boolean;
  hospital: Hospital | null;
}

export class GetHospitalUseCase {
  constructor(private readonly hospitalRepository: IHospitalRepository) {}

  async execute(input: GetHospitalInput): Promise<GetHospitalOutput> {
    try {
      const hospital = await this.hospitalRepository.getById(input.id);

      return {
        success: true,
        hospital,
      };
    } catch (error) {
      throw new Error(
        `Failed to get hospital: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
