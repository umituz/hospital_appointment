import { Hospital } from "../../types";
import { IHospitalRepository } from "../ports/IHospitalRepository";

export interface GetHospitalsInput {
  // No input parameters for now
}

export interface GetHospitalsOutput {
  success: boolean;
  hospitals: Hospital[];
}

export class GetHospitalsUseCase {
  constructor(private readonly hospitalRepository: IHospitalRepository) {}

  async execute(_input: GetHospitalsInput): Promise<GetHospitalsOutput> {
    try {
      const hospitals = await this.hospitalRepository.getAll();

      return {
        success: true,
        hospitals,
      };
    } catch (error) {
      throw new Error(
        `Failed to get hospitals: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
