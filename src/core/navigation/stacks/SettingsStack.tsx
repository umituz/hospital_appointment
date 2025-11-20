import React from 'react';
import { createStackNavigator } from '@umituz/react-native-tabs-bottom-navigator';
import { STATIC_TOKENS, useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { SettingsScreen, AppearanceScreen, LanguageSelectionScreen } from '@umituz/react-native-settings';


import { SettingsStackParamList } from '@core/navigation/types';
import type { StackNavigatorConfig } from '@umituz/react-native-tabs-bottom-navigator';

export const SettingsStackNavigator: React.FC = () => {
  const tokens = useAppDesignTokens();

  const screenOptions = {
    headerStyle: { backgroundColor: tokens.colors.surface, borderBottomColor: tokens.colors.borderLight, borderBottomWidth: 1 },
    headerTitleStyle: { ...STATIC_TOKENS.typography.headingMedium, color: tokens.colors.textPrimary },
    headerTintColor: tokens.colors.textPrimary,
  };

  const stackConfig: StackNavigatorConfig = {
    screens: [
      {
        name: 'Settings',
        component: SettingsScreen,
        options: { title: 'Settings', headerShown: false },
      },
      {
        name: 'Appearance',
        component: AppearanceScreen,
        options: {
          headerShown: true,
          headerTitle: 'Appearance',
          headerTitleAlign: 'center',
          headerBackTitle: 'Settings',
        },
      },
      {
        name: 'LanguageSelection',
        component: LanguageSelectionScreen,
        options: {
          headerShown: true,
          headerTitle: 'Language',
          headerTitleAlign: 'center',
          headerBackTitle: 'Settings',
        },
      },
      
      
    ],
    initialRouteName: 'Settings',
    screenOptions,
  };

  const StackNavigator = createStackNavigator<SettingsStackParamList>(stackConfig);

  return <StackNavigator />;
};
