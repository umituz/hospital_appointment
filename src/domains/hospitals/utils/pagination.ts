import { Hospital } from "../types";

export function getHospitalsPage(
  hospitals: Hospital[],
  page: number,
  pageSize: number,
): Hospital[] {
  const start = page * pageSize;
  const end = start + pageSize;
  return hospitals.slice(start, end);
}

export function hasMoreHospitals(
  allHospitals: Hospital[],
  loadedHospitals: Hospital[],
): boolean {
  return loadedHospitals.length < allHospitals.length;
}
