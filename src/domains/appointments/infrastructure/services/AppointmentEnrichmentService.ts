import { Appointment, AppointmentFormData } from "../../types";
import { HospitalRepository } from "../../../hospitals/infrastructure/repositories";
import { DepartmentRepository } from "../repositories/DepartmentRepository";
import { DoctorRepository } from "../../../doctors/infrastructure/repositories";
import type { Hospital } from "../../../hospitals/types";
import type { Department } from "../../types";
import type { Doctor } from "../../../doctors/types";

export class AppointmentEnrichmentService {
  private hospitalRepository = new HospitalRepository();
  private departmentRepository = new DepartmentRepository();
  private doctorRepository = new DoctorRepository();

  async enrichWithRelations(
    data: AppointmentFormData,
  ): Promise<Partial<Appointment>> {
    const [hospitals, departments, doctors] = await Promise.all([
      this.hospitalRepository.getAll(),
      this.departmentRepository.getByHospitalId(data.hospital_id),
      this.doctorRepository.getByDepartmentId(data.department_id),
    ]);

    const hospital = hospitals.find(
      (h: Hospital) => h.id.toString() === data.hospital_id.toString(),
    );
    const department = departments.find(
      (d: Department) => d.id.toString() === data.department_id.toString(),
    );
    const doctor = doctors.find(
      (d: Doctor) => d.id.toString() === data.doctor_id.toString(),
    );

    return {
      hospital_name: hospital?.name,
      hospital_address: hospital?.address,
      hospital_phone: hospital?.phone,
      latitude: hospital?.latitude,
      longitude: hospital?.longitude,
      department_name: department?.name,
      doctor_name: doctor?.name,
      doctor_specialty: doctor?.specialty,
      doctor_image: doctor?.image,
      rating: doctor?.rating,
      experience_years: doctor?.experience_years,
    };
  }
}
