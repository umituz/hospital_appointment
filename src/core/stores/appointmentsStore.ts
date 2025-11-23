import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Appointment } from "@/domains/appointments/types";

interface AppointmentsStore {
  appointments: Appointment[];
  isLoading: boolean;
  error: Error | null;

  // Actions
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  removeAppointment: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  clearAll: () => void;
}

export const useAppointmentsStore = create<AppointmentsStore>()(
  persist(
    (set, get) => ({
      appointments: [],
      isLoading: false,
      error: null,

      setAppointments: (appointments) => set({ appointments }),

      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [...state.appointments, appointment],
        })),

      updateAppointment: (id, updates) =>
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === id
              ? { ...appointment, ...updates }
              : appointment,
          ),
        })),

      removeAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter(
            (appointment) => appointment.id !== id,
          ),
        })),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearAll: () => set({ appointments: [], isLoading: false, error: null }),
    }),
    {
      name: "@hospital_appointment:appointments",
    },
  ),
);
