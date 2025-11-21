import { AppointmentStatus } from '../types';

export class AppointmentFormattingService {
  static formatDate(dateString: string, locale: string = 'en-US'): string {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }

    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }

    return date.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  static formatTime(timeString: string, locale: string = 'en-US'): string {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  static formatDateTime(dateString: string, timeString: string, locale: string = 'en-US'): string {
    const date = this.formatDate(dateString, locale);
    const time = this.formatTime(timeString, locale);
    return `${date} at ${time}`;
  }

  static getStatusText(status: AppointmentStatus, t: (key: string) => string): string {
    const statusKey = `appointments.status.${status}`;
    return t(statusKey);
  }
}

