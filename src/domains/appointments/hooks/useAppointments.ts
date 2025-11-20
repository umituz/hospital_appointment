import { useState, useEffect } from 'react';
import { AppointmentRepository } from '../infrastructure/repositories';
import { Appointment } from '../types';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new AppointmentRepository();

  const fetchAppointments = async () => {
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
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    isLoading,
    error,
    refetch: fetchAppointments,
  };
}

