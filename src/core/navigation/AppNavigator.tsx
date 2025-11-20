/**
 * App Navigator - hospital_appointment (Offline Mode)
 *
 * ⚠️ CRITICAL: OFFLINE MODE NAVIGATION
 *
 * This is the navigation system for offline-only apps.
 * NO AUTH FLOW - Apps go directly from Splash → Onboarding → Main content.
 *
 * 🎯 OFFLINE NAVIGATION FLOW:
 * ───────────────────────────────────────────────────────────────
 *
 * NAVIGATION FLOW:
 * 1. Splash Screen (loading/initialization)
 * 2. Onboarding (first-time users)
 * 3. Main Stack (app content) - No authentication required
 *
 * ✅ OFFLINE MODE CHARACTERISTICS:
 * ───────────────────────────────────────────────
 * - No authentication/login screens
 * - No backend connection
 * - All data stored locally (AsyncStorage)
 * - Immediate access to app features
 * - No account management required
 *
 * 📚 FACTORY STANDARD:
 * ───────────────────────────────────────────────
 * This pattern ensures:
 * ✅ Zero network dependency
 * ✅ Instant app access
 * ✅ Consistent across offline apps
 * ✅ Privacy-first architecture
 */

import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { createStackNavigator } from '@umituz/react-native-tabs-bottom-navigator';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { SplashScreen } from '@screens/SplashScreen';
import { OnboardingScreen } from '@umituz/react-native-onboarding';
import { MainNavigator } from './tabs/MainTabs';
import { RootStackParamList } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StackNavigatorConfig } from '@umituz/react-native-tabs-bottom-navigator';
import { AppointmentDetailScreen } from '@screens/appointments/AppointmentDetailScreen';

export const AppNavigator: React.FC = () => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = React.useState(false);
  const tokens = useAppDesignTokens();

  React.useEffect(() => {
    AsyncStorage.getItem('onboarding_complete').then((value) => {
      setIsOnboardingComplete(value === 'true');
    });

    // Listen for splash ready event
    const splashSubscription = DeviceEventEmitter.addListener('splash-ready', () => {
      setIsInitialized(true);
    });

    // Listen for onboarding completion event (works on iOS, Android, Web)
    const onboardingSubscription = DeviceEventEmitter.addListener('onboarding-complete', () => {
      setIsOnboardingComplete(true);
    });

    return () => {
      splashSubscription.remove();
      onboardingSubscription.remove();
    };
  }, []);

  // Build screens array based on app state
  const screens: StackNavigatorConfig['screens'] = [];
  
  if (!isInitialized) {
    screens.push({
      name: 'Splash',
      component: SplashScreen,
      options: { headerShown: false },
    });
  } else if (!isOnboardingComplete) {
    screens.push({
      name: 'Onboarding',
      component: OnboardingScreen as any,
      options: { headerShown: false },
    });
  } else {
    screens.push({
      name: 'Main',
      component: MainNavigator,
      options: { headerShown: false },
    });
        screens.push({
      name: 'AppointmentDetail',
      component: AppointmentDetailScreen,
      options: { headerShown: true, title: 'Appointment Detail', presentation: 'modal' },
    });
  }

  const stackConfig: StackNavigatorConfig = {
    screens,
    initialRouteName: !isInitialized ? 'Splash' : !isOnboardingComplete ? 'Onboarding' : 'Main',
    screenOptions: {
      headerShown: false,
    },
  };

  const RootStackNavigator = createStackNavigator<RootStackParamList>(stackConfig);

  return <RootStackNavigator />;
};

export default AppNavigator;
