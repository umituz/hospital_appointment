import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Hospital } from "@/domains/hospitals/types";

interface HospitalsStore {
  hospitals: Hospital[];
  isLoading: boolean;
  error: Error | null;

  // Actions
  setHospitals: (hospitals: Hospital[]) => void;
  addHospital: (hospital: Hospital) => void;
  updateHospital: (id: string, hospital: Partial<Hospital>) => void;
  removeHospital: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  clearAll: () => void;
}

export const useHospitalsStore = create<HospitalsStore>()(
  persist(
    (set, get) => ({
      hospitals: [],
      isLoading: false,
      error: null,

      setHospitals: (hospitals) => set({ hospitals }),

      addHospital: (hospital) =>
        set((state) => ({
          hospitals: [...state.hospitals, hospital],
        })),

      updateHospital: (id, updates) =>
        set((state) => ({
          hospitals: state.hospitals.map((hospital) =>
            hospital.id === id ? { ...hospital, ...updates } : hospital,
          ),
        })),

      removeHospital: (id) =>
        set((state) => ({
          hospitals: state.hospitals.filter((hospital) => hospital.id !== id),
        })),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearAll: () => set({ hospitals: [], isLoading: false, error: null }),
    }),
    {
      name: "@hospital_appointment:hospitals",
    },
  ),
);
