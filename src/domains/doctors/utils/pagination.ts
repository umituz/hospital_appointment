import { Doctor } from "../types";

export function getDoctorsPage(
  doctors: Doctor[],
  page: number,
  pageSize: number,
): Doctor[] {
  const start = page * pageSize;
  const end = start + pageSize;
  return doctors.slice(start, end);
}

export function hasMoreDoctors(
  allDoctors: Doctor[],
  loadedDoctors: Doctor[],
): boolean {
  return loadedDoctors.length < allDoctors.length;
}
