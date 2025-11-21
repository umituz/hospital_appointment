import React from 'react';
import { OnboardingScreen } from '@umituz/react-native-onboarding';
import { hospitalAppointmentOnboardingSlides } from '../../data/onboardingSlides';
import { AppNavigation } from '@umituz/react-native-navigation';
import { useOnboardingCompletion } from '../../hooks/useOnboardingCompletion';

export const OnboardingFlowScreen: React.FC = () => {
  const { handleComplete, handleSkip } = useOnboardingCompletion();

  const handleNavigation = () => {
    setTimeout(() => {
      try {
        AppNavigation.navigate('Main');
      } catch {
        // Ignore if Main is not in stack yet
      }
    }, 500);
  };

  const onComplete = async () => {
    await handleComplete();
    handleNavigation();
  };

  const onSkip = async () => {
    await handleSkip();
    handleNavigation();
  };

  return (
    <OnboardingScreen
      slides={hospitalAppointmentOnboardingSlides}
      onComplete={onComplete}
      onSkip={onSkip}
      skipButtonText="Skip"
      nextButtonText="Continue"
      getStartedButtonText="Get Started"
      showSkipButton={true}
      showBackButton={true}
      showProgressBar={true}
      showDots={true}
      showProgressText={true}
      storageKey="@hospital_appointment_onboarding_completed"
      autoComplete={false}
    />
  );
};

