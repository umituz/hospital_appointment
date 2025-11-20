import React from 'react';
import { createTabNavigator } from '@umituz/react-native-tabs-bottom-navigator';
import { useAppDesignTokens, STATIC_TOKENS } from '@umituz/react-native-design-system-theme';
import { AtomicIcon } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';
import { SettingsStackNavigator } from '../stacks/SettingsStack';
import { MainTabParamList } from '@core/navigation/types';
import type { TabNavigatorConfig } from '@umituz/react-native-tabs-bottom-navigator';
import { AppointmentsScreen } from '../../../screens/appointments/AppointmentsScreen';
import { AppointmentDetailScreen } from '../../../screens/appointments/AppointmentDetailScreen';
import { HospitalsScreen } from '../../../screens/hospitals/HospitalsScreen';
import { DoctorsScreen } from '../../../screens/doctors/DoctorsScreen';

export const MainNavigator: React.FC = () => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  const getTabIcon = (routeName: string): string => {
    switch (routeName) {
      //       case 'Appointments': return 'Calendar';
      case 'Hospitals': return 'Building2';
      case 'Doctors': return 'User';
      case 'SettingsStack': return 'Settings';
      default: return 'Circle';
    }
  };

  // Generate app-specific tabs with safe fallback
  const appSpecificTabsRaw: Array<{
    name: string;
    label: string;
    icon: string;
    component: React.ComponentType<any>;
  }> = [
          {
        name: 'Appointments',
        label: t('navigation.appointments'),
        icon: 'Calendar',
        component: AppointmentsScreen,
      },
      {
        name: 'Hospitals',
        label: t('navigation.hospitals'),
        icon: 'Building2',
        component: HospitalsScreen,
      },
      {
        name: 'Doctors',
        label: t('navigation.doctors'),
        icon: 'User',
        component: DoctorsScreen,
      },
  ];
  
  // Ensure appSpecificTabs is always a valid array and filter out invalid entries
  const safeAppSpecificTabs = (Array.isArray(appSpecificTabsRaw) ? appSpecificTabsRaw : [])
    .filter((tab) => tab && typeof tab === 'object' && tab.name && tab.component);

  const allTabs: Array<{
    name: string;
    label: string;
    icon: string;
    component: React.ComponentType<any>;
  }> = [
    ...safeAppSpecificTabs,
    {
      name: 'SettingsStack',
      label: t('navigation.settings'),
      icon: getTabIcon('SettingsStack'),
      component: SettingsStackNavigator,
    },
  ];

  const tabConfig: TabNavigatorConfig<MainTabParamList> = {
    screens: allTabs,
    initialRouteName: (safeAppSpecificTabs.length > 0 ? safeAppSpecificTabs[0].name : 'SettingsStack') as Extract<keyof MainTabParamList, string>,
    getTabIcon: (routeName: string, focused: boolean) => getTabIcon(routeName),
    renderIcon: (iconName: string, focused: boolean) => (
      <AtomicIcon 
        name={iconName} 
        color={focused ? "primary" : "secondary"} 
        size="lg" 
      />
    ),
    screenOptions: {
      tabBarActiveTintColor: tokens.colors.primary,
      tabBarInactiveTintColor: tokens.colors.textSecondary,
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
      tabBarStyle: {
        backgroundColor: tokens.colors.surface,
        borderTopColor: tokens.colors.borderLight,
        borderTopWidth: 1,
        paddingTop: 12,
        paddingBottom: 24,
        minHeight: 70,
      },
      headerStyle: { backgroundColor: tokens.colors.surface, borderBottomColor: tokens.colors.borderLight, borderBottomWidth: 1 },
      headerTitleStyle: { ...STATIC_TOKENS.typography.headingMedium, color: tokens.colors.textPrimary },
      headerTintColor: tokens.colors.textPrimary,
    },
  };

  const TabNavigator = createTabNavigator<MainTabParamList>(tabConfig);

  return <TabNavigator />;
};
