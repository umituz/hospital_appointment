import { AppointmentStatus } from '../types';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';

export class AppointmentStatusService {
  static getStatusColor(status: AppointmentStatus, tokens: ReturnType<typeof useAppDesignTokens>): string {
    const statusColorMap: Record<AppointmentStatus, string> = {
      scheduled: tokens.colors.primary,
      completed: tokens.colors.success || '#22C55E',
      cancelled: tokens.colors.error || '#EF4444',
      missed: tokens.colors.warning || '#F97316',
    };

    return statusColorMap[status] || tokens.colors.primary;
  }

  static isUpcoming(status: AppointmentStatus): boolean {
    return status === 'scheduled';
  }

  static isPast(status: AppointmentStatus): boolean {
    return status === 'completed' || status === 'missed';
  }

  static isCancelled(status: AppointmentStatus): boolean {
    return status === 'cancelled';
  }
}

