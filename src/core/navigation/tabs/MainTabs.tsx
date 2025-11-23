import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useAppDesignTokens,
  STATIC_TOKENS,
} from "@umituz/react-native-design-system-theme";
import { AtomicIcon } from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { SettingsStackNavigator } from "../stacks/SettingsStack";
import { MainTabParamList } from "@core/navigation/types";
import { AppointmentsScreen } from "../../../screens/appointments/AppointmentsScreen";
import { HospitalsScreen } from "../../../screens/hospitals/HospitalsScreen";
import { DoctorsScreen } from "../../../screens/doctors/DoctorsScreen";

const MainTabs = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator: React.FC = () => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  const getTabIcon = (routeName: string, focused: boolean): string => {
    switch (routeName) {
      case "Appointments":
        return "Calendar";
      case "Hospitals":
        return "Building2";
      case "Doctors":
        return "User";
      case "SettingsStack":
        return "Settings";
      default:
        return "Circle";
    }
  };

  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <View style={styles.tabIconContainer}>
            <AtomicIcon
              name={getTabIcon(route.name, focused)}
              color={focused ? "primary" : "secondary"}
              size="lg"
            />
          </View>
        ),
        tabBarActiveTintColor: tokens.colors.primary,
        tabBarInactiveTintColor: tokens.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 12,
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: tokens.colors.surface,
          borderTopColor: tokens.colors.borderLight,
          borderTopWidth: 1,
          paddingTop: 12,
          paddingBottom: 24,
          minHeight: 70,
        },
        headerStyle: {
          backgroundColor: tokens.colors.surface,
          borderBottomColor: tokens.colors.borderLight,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          ...STATIC_TOKENS.typography.headingMedium,
          color: tokens.colors.textPrimary,
        },
        headerTintColor: tokens.colors.textPrimary,
      })}
    >
      <MainTabs.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          title: t("navigation.appointments"),
          tabBarLabel: t("navigation.appointments"),
          tabBarTestID: "appointments-tab",
        }}
      />
      <MainTabs.Screen
        name="Doctors"
        component={DoctorsScreen}
        options={{
          title: t("navigation.doctors"),
          tabBarLabel: t("navigation.doctors"),
          tabBarTestID: "doctors-tab",
        }}
      />
      <MainTabs.Screen
        name="Hospitals"
        component={HospitalsScreen}
        options={{
          title: t("navigation.hospitals"),
          tabBarLabel: t("navigation.hospitals"),
          tabBarTestID: "hospitals-tab",
        }}
      />
      <MainTabs.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={{
          title: t("navigation.settings"),
          tabBarLabel: t("navigation.settings"),
          tabBarTestID: "settings-tab",
        }}
      />
    </MainTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    marginBottom: 0,
  },
});
