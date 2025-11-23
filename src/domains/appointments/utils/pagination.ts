import { Appointment } from "../types";

export function getAppointmentsPage(
  appointments: Appointment[],
  page: number,
  pageSize: number,
): Appointment[] {
  const start = page * pageSize;
  const end = start + pageSize;
  return appointments.slice(start, end);
}

export function hasMoreAppointments(
  allAppointments: Appointment[],
  loadedAppointments: Appointment[],
): boolean {
  return loadedAppointments.length < allAppointments.length;
}
