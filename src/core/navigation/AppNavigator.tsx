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

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";
import { useOnboardingStore } from "@umituz/react-native-onboarding";
import { OnboardingFlowScreen } from "@/domains/onboarding";
import { MainNavigator } from "./tabs/MainTabs";
import { RootStackParamList } from "./types";
import { AppointmentDetailScreen } from "@screens/appointments/AppointmentDetailScreen";
import { CreateDoctorScreen } from "@screens/doctors/CreateDoctorScreen";
import { EditDoctorScreen } from "@screens/doctors/EditDoctorScreen";
import { DoctorDetailScreen } from "@screens/doctors/DoctorDetailScreen";
import { CreateHospitalScreen } from "@screens/hospitals/CreateHospitalScreen";
import { EditHospitalScreen } from "@screens/hospitals/EditHospitalScreen";
import { HospitalDetailScreen } from "@screens/hospitals/HospitalDetailScreen";

const RootStack = createStackNavigator<RootStackParamList>();

const OnboardingScreenWrapper: React.FC = () => {
  return <OnboardingFlowScreen />;
};

export const AppNavigator: React.FC = () => {
  const tokens = useAppDesignTokens();

  // ✅ Use onboarding store state directly instead of local state
  const isOnboardingComplete = useOnboardingStore(
    (state) => state.isOnboardingComplete,
  );
  const loading = useOnboardingStore((state) => state.loading);

  // Don't render navigator until onboarding store has finished loading
  if (loading) {
    return null;
  }

  return (
    <RootStack.Navigator
      key={isOnboardingComplete ? "main" : "onboarding"}
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
              presentation: "modal",
              gestureEnabled: false,
            }}
          />
          <RootStack.Screen
            name="AppointmentDetail"
            component={AppointmentDetailScreen}
            options={{
              headerShown: true,
              title: "Appointment Detail",
              presentation: "modal",
            }}
          />
          <RootStack.Screen
            name="CreateDoctor"
            component={CreateDoctorScreen}
            options={{
              headerShown: true,
              title: "Add Doctor",
              presentation: "modal",
            }}
          />
          <RootStack.Screen
            name="EditDoctor"
            component={EditDoctorScreen}
            options={{
              headerShown: true,
              title: "Edit Doctor",
              presentation: "modal",
            }}
          />
          <RootStack.Screen
            name="DoctorDetail"
            component={DoctorDetailScreen}
            options={{
              headerShown: true,
              title: "Doctor Details",
              presentation: "modal",
            }}
          />
          <RootStack.Screen
            name="CreateHospital"
            component={CreateHospitalScreen}
            options={{
              headerShown: true,
              title: "Add Hospital",
              presentation: "modal",
            }}
          />
          <RootStack.Screen
            name="EditHospital"
            component={EditHospitalScreen}
            options={{
              headerShown: true,
              title: "Edit Hospital",
              presentation: "modal",
            }}
          />
          <RootStack.Screen
            name="HospitalDetail"
            component={HospitalDetailScreen}
            options={{
              headerShown: true,
              title: "Hospital Details",
              presentation: "modal",
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;
