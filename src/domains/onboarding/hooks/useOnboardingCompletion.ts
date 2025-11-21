import { useCallback } from 'react';
import { useOnboarding } from '@umituz/react-native-onboarding';

export interface UseOnboardingCompletionReturn {
  handleComplete: () => Promise<void>;
  handleSkip: () => Promise<void>;
}

const ONBOARDING_STORAGE_KEY = '@hospital_appointment_onboarding_completed';

export function useOnboardingCompletion(): UseOnboardingCompletionReturn {
  const { complete, skip } = useOnboarding();

  const handleComplete = useCallback(async () => {
    await complete(ONBOARDING_STORAGE_KEY);
  }, [complete]);

  const handleSkip = useCallback(async () => {
    await skip(ONBOARDING_STORAGE_KEY);
  }, [skip]);

  return {
    handleComplete,
    handleSkip,
  };
}

