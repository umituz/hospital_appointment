import { Doctor } from "../../types";
import { IDoctorRepository } from "../ports/IDoctorRepository";

export interface GetDoctorsInput {
  departmentId?: string;
}

export interface GetDoctorsOutput {
  success: boolean;
  doctors: Doctor[];
}

export class GetDoctorsUseCase {
  constructor(private readonly doctorRepository: IDoctorRepository) {}

  async execute(input: GetDoctorsInput): Promise<GetDoctorsOutput> {
    try {
      let doctors: Doctor[];

      if (input.departmentId) {
        doctors = await this.doctorRepository.getByDepartmentId(
          input.departmentId,
        );
      } else {
        doctors = await this.doctorRepository.getAll();
      }

      return {
        success: true,
        doctors,
      };
    } catch (error) {
      throw new Error(
        `Failed to get doctors: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
