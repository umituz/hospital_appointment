import { DoctorRepository } from "../repositories";
import { DoctorValidationService } from "../../utils/validation";
import { DoctorFormData } from "../../types";
import { storageService } from "../../../storage/infrastructure/services";

export class DoctorService {
  private doctorRepository: DoctorRepository;

  constructor() {
    this.doctorRepository = new DoctorRepository(storageService);
  }

  async createDoctor(
    data: DoctorFormData,
    t: (key: string) => string,
  ): Promise<void> {
    const validation = DoctorValidationService.validateFormData(data, t);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    try {
      await this.doctorRepository.create(data);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__)
        console.error("[DoctorService] Error creating doctor:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(t("doctors.errors.createFailed"));
    }
  }

  async updateDoctor(
    id: string,
    data: Partial<DoctorFormData>,
    t: (key: string) => string,
  ): Promise<void> {
    if (!id) {
      throw new Error(t("doctors.errors.idRequired"));
    }

    const validation = DoctorValidationService.validateFormData(
      data as DoctorFormData,
      t,
    );
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    try {
      await this.doctorRepository.update(id, data);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__)
        console.error("[DoctorService] Error updating doctor:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(t("doctors.errors.updateFailed"));
    }
  }

  async deleteDoctor(id: string, t: (key: string) => string): Promise<void> {
    if (!id) {
      throw new Error(t("doctors.errors.idRequired"));
    }

    try {
      await this.doctorRepository.delete(id);
    } catch (error) {
      /* eslint-disable-next-line no-console */
      if (__DEV__)
        console.error("[DoctorService] Error deleting doctor:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(t("doctors.errors.deleteFailed"));
    }
  }
}
