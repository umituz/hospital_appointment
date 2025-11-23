import { Hospital } from "../../types";
import { IHospitalRepository } from "../ports/IHospitalRepository";
import { HospitalValidationService } from "../../utils/validation";

export interface CreateHospitalInput {
  data: any; // HospitalFormData
  t: (key: string) => string;
}

export interface CreateHospitalOutput {
  success: boolean;
  hospital?: Hospital;
  errors?: string[];
}

export class CreateHospitalUseCase {
  constructor(private readonly hospitalRepository: IHospitalRepository) {}

  async execute(input: CreateHospitalInput): Promise<CreateHospitalOutput> {
    try {
      // Validate input data
      const validation = HospitalValidationService.validateFormData(
        input.data,
        input.t,
      );

      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors,
        };
      }

      // Create hospital
      const hospital = await this.hospitalRepository.create(input.data);

      return {
        success: true,
        hospital,
      };
    } catch (error) {
      throw new Error(
        `Failed to create hospital: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
