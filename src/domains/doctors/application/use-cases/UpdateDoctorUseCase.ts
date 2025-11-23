import { Doctor, DoctorFormData } from "../../types";
import { IDoctorRepository } from "../ports/IDoctorRepository";
import { DoctorValidationService } from "../../utils/validation";

export interface UpdateDoctorInput {
  id: string;
  data: Partial<DoctorFormData>;
  t: (key: string) => string;
}

export interface UpdateDoctorOutput {
  success: boolean;
  doctor?: Doctor;
  errors?: string[];
}

export class UpdateDoctorUseCase {
  constructor(private readonly doctorRepository: IDoctorRepository) {}

  async execute(input: UpdateDoctorInput): Promise<UpdateDoctorOutput> {
    try {
      // Validate input data if provided
      if (input.data && Object.keys(input.data).length > 0) {
        // Only validate provided fields
        const validation = DoctorValidationService.validateFormData(
          input.data as DoctorFormData,
          input.t,
        );
        if (!validation.isValid) {
          return {
            success: false,
            errors: validation.errors,
          };
        }
      }

      // Update doctor
      const doctor = await this.doctorRepository.update(input.id, input.data);

      return {
        success: true,
        doctor,
      };
    } catch (error) {
      throw new Error(
        `Failed to update doctor: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
