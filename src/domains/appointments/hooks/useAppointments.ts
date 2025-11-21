import { useState, useEffect, useMemo, useCallback } from 'react';
import { AppointmentRepository } from '../infrastructure/repositories';
import { Appointment } from '../types';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize repository to prevent recreation on every render
  const repository = useMemo(() => new AppointmentRepository(), []);

  // Memoize fetch function to prevent infinite loops
  const fetchAppointments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await repository.getAll();
      setAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch appointments'));
    } finally {
      setIsLoading(false);
    }
  }, [repository]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    isLoading,
    error,
    refetch: fetchAppointments,
  };
}

