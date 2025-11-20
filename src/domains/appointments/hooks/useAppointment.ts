import { useState, useEffect } from 'react';
import { AppointmentRepository } from '../infrastructure/repositories';
import { Appointment } from '../types';

export function useAppointment(id: string | undefined) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repository = new AppointmentRepository();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchAppointment = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await repository.getById(id);
        setAppointment(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch appointment'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  return {
    appointment,
    isLoading,
    error,
  };
}

