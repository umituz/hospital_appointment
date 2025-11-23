import { DoctorRepository } from "../repositories";
import { storageService } from "../../../storage/infrastructure/services";

export class DoctorDataService {
  private doctorRepository: DoctorRepository;

  constructor() {
    this.doctorRepository = new DoctorRepository(storageService);
  }

  async create(data: any): Promise<any> {
    return this.doctorRepository.create(data);
  }

  async update(id: string, data: any): Promise<any> {
    return this.doctorRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.doctorRepository.delete(id);
  }

  async getAll(): Promise<any[]> {
    return this.doctorRepository.getAll();
  }

  async getById(id: string): Promise<any | null> {
    return this.doctorRepository.getById(id);
  }

  async getByDepartmentId(departmentId: string): Promise<any[]> {
    return this.doctorRepository.getByDepartmentId(departmentId);
  }
}
