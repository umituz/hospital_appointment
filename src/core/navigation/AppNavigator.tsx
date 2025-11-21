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

import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { useOnboardingStore } from '@umituz/react-native-onboarding';
import { SplashScreen } from '@screens/SplashScreen';
import { OnboardingFlowScreen } from '@/domains/onboarding';
import { MainNavigator } from './tabs/MainTabs';
import { RootStackParamList } from './types';
import { AppointmentDetailScreen } from '@screens/appointments/AppointmentDetailScreen';

const RootStack = createStackNavigator<RootStackParamList>();

const OnboardingScreenWrapper: React.FC = () => {
  return <OnboardingFlowScreen />;
};

export const AppNavigator: React.FC = () => {
  const tokens = useAppDesignTokens();
  const [isInitialized, setIsInitialized] = useState(false);
  const isOnboardingComplete = useOnboardingStore((state) => state.isOnboardingComplete);
  const loading = useOnboardingStore((state) => state.loading);

  useEffect(() => {
    const checkInitialization = async () => {
      await useOnboardingStore.getState().initialize('@hospital_appointment_onboarding_completed');
    };

    checkInitialization();
  }, []);

  useEffect(() => {
    const splashSubscription = require('react-native').DeviceEventEmitter.addListener('splash-ready', () => {
      setIsInitialized(true);
    });

    return () => {
      splashSubscription.remove();
    };
  }, []);

  if (loading || !isInitialized) {
    return null;
  }

  return (
    <RootStack.Navigator
      key={isOnboardingComplete ? 'main' : 'onboarding'}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: tokens.colors.backgroundPrimary },
      }}
    >
      {!isOnboardingComplete ? (
        <RootStack.Screen
          name="Onboarding"
          component={OnboardingScreenWrapper}
        />
      ) : (
        <>
          <RootStack.Screen name="Main" component={MainNavigator} />
          <RootStack.Screen
            name="Onboarding"
            component={OnboardingScreenWrapper}
            options={{
              headerShown: false,
              presentation: 'modal',
              gestureEnabled: false,
            }}
          />
          <RootStack.Screen
            name="AppointmentDetail"
            component={AppointmentDetailScreen}
            options={{
              headerShown: true,
              title: 'Appointment Detail',
              presentation: 'modal',
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;
