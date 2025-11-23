import { Doctor } from "../../types";
import { IDoctorRepository } from "../ports/IDoctorRepository";
import { DoctorValidationService } from "../../utils/validation";

export interface CreateDoctorInput {
  data: any; // DoctorFormData
  t: (key: string) => string;
}

export interface CreateDoctorOutput {
  success: boolean;
  doctor?: Doctor;
  errors?: string[];
}

export class CreateDoctorUseCase {
  constructor(private readonly doctorRepository: IDoctorRepository) {}

  async execute(input: CreateDoctorInput): Promise<CreateDoctorOutput> {
    try {
      // Validate input data
      const validation = DoctorValidationService.validateFormData(
        input.data,
        input.t,
      );

      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors,
        };
      }

      // Create doctor
      const doctor = await this.doctorRepository.create(input.data);

      return {
        success: true,
        doctor,
      };
    } catch (error) {
      throw new Error(
        `Failed to create doctor: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
