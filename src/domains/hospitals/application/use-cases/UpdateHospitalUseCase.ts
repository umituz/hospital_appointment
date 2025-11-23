import { Hospital, HospitalFormData } from "../../types";
import { IHospitalRepository } from "../ports/IHospitalRepository";
import { HospitalValidationService } from "../../utils/validation";

export interface UpdateHospitalInput {
  id: string;
  data: Partial<HospitalFormData>;
  t: (key: string) => string;
}

export interface UpdateHospitalOutput {
  success: boolean;
  hospital?: Hospital;
  errors?: string[];
}

export class UpdateHospitalUseCase {
  constructor(private readonly hospitalRepository: IHospitalRepository) {}

  async execute(input: UpdateHospitalInput): Promise<UpdateHospitalOutput> {
    try {
      // Validate input data if provided
      if (input.data && Object.keys(input.data).length > 0) {
        // Only validate provided fields
        const validation = HospitalValidationService.validateFormData(
          input.data as HospitalFormData,
          input.t,
        );
        if (!validation.isValid) {
          return {
            success: false,
            errors: validation.errors,
          };
        }
      }

      // Update hospital
      const hospital = await this.hospitalRepository.update(
        input.id,
        input.data,
      );

      return {
        success: true,
        hospital,
      };
    } catch (error) {
      throw new Error(
        `Failed to update hospital: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
