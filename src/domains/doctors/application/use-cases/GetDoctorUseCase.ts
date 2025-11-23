import { Doctor } from "../../types";
import { IDoctorRepository } from "../ports/IDoctorRepository";

export interface GetDoctorInput {
  id: string;
}

export interface GetDoctorOutput {
  success: boolean;
  doctor: Doctor | null;
}

export class GetDoctorUseCase {
  constructor(private readonly doctorRepository: IDoctorRepository) {}

  async execute(input: GetDoctorInput): Promise<GetDoctorOutput> {
    try {
      const doctor = await this.doctorRepository.getById(input.id);

      return {
        success: true,
        doctor,
      };
    } catch (error) {
      throw new Error(
        `Failed to get doctor: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
