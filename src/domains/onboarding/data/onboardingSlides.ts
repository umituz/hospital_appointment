import type { OnboardingSlide } from '@umituz/react-native-onboarding';

export const hospitalAppointmentOnboardingSlides: OnboardingSlide[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Welcome to Hospital Appointment',
    description: 'Manage your medical appointments, track doctors, and organize hospital visits',
    icon: 'Calendar',
    gradient: ['#667eea', '#764ba2'],
    features: [
      'Schedule appointments easily',
      'Track your favorite doctors',
      'Manage hospital visits',
      'Never miss an appointment',
    ],
  },
  {
    id: 'completion',
    type: 'completion',
    title: 'You\'re All Set!',
    description: 'Start managing your medical appointments',
    icon: 'CheckCircle',
    gradient: ['#667eea', '#764ba2'],
    features: [
      'Create appointments',
      'Find doctors and hospitals',
      'Track your medical history',
      'Stay organized',
    ],
  },
];

