import { useEffect } from "react";
import { useDoctorsState } from "./useDoctorsState";
import { useDoctorsError } from "./useDoctorsError";
import { useDoctorsData } from "./useDoctorsData";

export interface UseDoctorsReturn {
  doctors: import("../types").Doctor[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDoctors(): UseDoctorsReturn {
  const { state, actions } = useDoctorsState();
  const errorHandler = useDoctorsError(actions);
  const { fetchDoctors, refetch } = useDoctorsData(actions, errorHandler);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors: state.doctors,
    isLoading: state.isLoading,
    error: state.error,
    refetch,
  };
}
