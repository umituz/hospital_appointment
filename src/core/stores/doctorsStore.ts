import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Doctor } from "@/domains/doctors/types";

interface DoctorsStore {
  doctors: Doctor[];
  isLoading: boolean;
  error: Error | null;

  // Actions
  setDoctors: (doctors: Doctor[]) => void;
  addDoctor: (doctor: Doctor) => void;
  updateDoctor: (id: string, doctor: Partial<Doctor>) => void;
  removeDoctor: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  clearAll: () => void;
}

export const useDoctorsStore = create<DoctorsStore>()(
  persist(
    (set, get) => ({
      doctors: [],
      isLoading: false,
      error: null,

      setDoctors: (doctors) => set({ doctors }),

      addDoctor: (doctor) =>
        set((state) => ({
          doctors: [...state.doctors, doctor],
        })),

      updateDoctor: (id, updates) =>
        set((state) => ({
          doctors: state.doctors.map((doctor) =>
            doctor.id === id ? { ...doctor, ...updates } : doctor,
          ),
        })),

      removeDoctor: (id) =>
        set((state) => ({
          doctors: state.doctors.filter((doctor) => doctor.id !== id),
        })),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearAll: () => set({ doctors: [], isLoading: false, error: null }),
    }),
    {
      name: "@hospital_appointment:doctors",
    },
  ),
);
