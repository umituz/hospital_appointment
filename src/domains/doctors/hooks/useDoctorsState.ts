import { useState } from "react";
import { Doctor } from "../types";

export interface DoctorsState {
  doctors: Doctor[];
  isLoading: boolean;
  error: Error | null;
}

export interface DoctorsStateActions {
  setDoctors: (doctors: Doctor[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export interface UseDoctorsStateReturn {
  state: DoctorsState;
  actions: DoctorsStateActions;
}

const initialState: DoctorsState = {
  doctors: [],
  isLoading: true,
  error: null,
};

export function useDoctorsState(): UseDoctorsStateReturn {
  const [doctors, setDoctors] = useState<Doctor[]>(initialState.doctors);
  const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading);
  const [error, setError] = useState<Error | null>(initialState.error);

  const actions: DoctorsStateActions = {
    setDoctors,
    setIsLoading,
    setError,
    reset: () => {
      setDoctors(initialState.doctors);
      setIsLoading(initialState.isLoading);
      setError(initialState.error);
    },
  };

  const state: DoctorsState = {
    doctors,
    isLoading,
    error,
  };

  return {
    state,
    actions,
  };
}
