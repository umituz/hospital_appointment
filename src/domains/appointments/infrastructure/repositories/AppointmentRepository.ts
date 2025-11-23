import { Appointment, AppointmentFormData } from "../../types";
import { storageService } from "../../../storage/infrastructure/services";
import { HospitalRepository } from "../../../hospitals/infrastructure/repositories";
import { DepartmentRepository } from "./DepartmentRepository";
import { DoctorRepository } from "../../../doctors/infrastructure/repositories";

const STORAGE_KEY = "@hospital_appointment:appointments";

export class AppointmentRepository {
  private hospitalRepository = new HospitalRepository();
  private departmentRepository = new DepartmentRepository();
  private doctorRepository = new DoctorRepository();

  private async getAllFromStorage(): Promise<Appointment[]> {
    const appointments = await storageService.getItem<Appointment[]>(
      STORAGE_KEY,
      [],
    );
    return appointments || [];
  }

  private async saveToStorage(appointments: Appointment[]): Promise<void> {
    await storageService.setItem(STORAGE_KEY, appointments);
  }

  private async enrichAppointmentWithRelations(
    data: AppointmentFormData,
  ): Promise<Partial<Appointment>> {
    const hospitals = await this.hospitalRepository.getAll();
    const departments = await this.departmentRepository.getByHospitalId(
      data.hospital_id,
    );
    const doctors = await this.doctorRepository.getByDepartmentId(
      data.department_id,
    );

    const hospital = hospitals.find(
      (h) => h.id.toString() === data.hospital_id.toString(),
    );
    const department = departments.find(
      (d) => d.id.toString() === data.department_id.toString(),
    );
    const doctor = doctors.find(
      (d) => d.id.toString() === data.doctor_id.toString(),
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

  async getAll(): Promise<Appointment[]> {
    return this.getAllFromStorage();
  }

  async getById(id: string): Promise<Appointment | null> {
    const appointments = await this.getAllFromStorage();
    return appointments.find((a) => a.id === id) || null;
  }

  async create(data: AppointmentFormData): Promise<Appointment> {
    const appointments = await this.getAllFromStorage();
    const relations = await this.enrichAppointmentWithRelations(data);
    const newAppointment: Appointment = {
      ...data,
      ...relations,
      id: Date.now().toString(),
      status: "scheduled",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    appointments.push(newAppointment);
    await this.saveToStorage(appointments);
    return newAppointment;
  }

  async update(id: string, data: AppointmentFormData): Promise<Appointment> {
    const appointments = await this.getAllFromStorage();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error("Appointment not found");
    }
    const relations = await this.enrichAppointmentWithRelations(data);
    const updatedAppointment: Appointment = {
      ...appointments[index],
      ...data,
      ...relations,
      id,
      updated_at: new Date().toISOString(),
    };
    appointments[index] = updatedAppointment;
    await this.saveToStorage(appointments);
    return updatedAppointment;
  }

  async delete(id: string): Promise<void> {
    const appointments = await this.getAllFromStorage();
    const filtered = appointments.filter((a) => a.id !== id);
    await this.saveToStorage(filtered);
  }
}
