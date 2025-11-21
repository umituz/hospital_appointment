import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useLocalization } from '@umituz/react-native-localization';
import { STATIC_TOKENS, useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import {
  AppearanceScreen,
  LanguageSelectionScreen,
} from '@umituz/react-native-settings';
import { AboutScreen } from '@umituz/react-native-about';
import { LegalScreen } from '@umituz/react-native-legal';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { SettingsStackParamList } from '@core/navigation/types';

const SettingsStack = createStackNavigator<SettingsStackParamList>();

export const SettingsStackNavigator: React.FC = () => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  const screenOptions = {
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
  };

  return (
    <SettingsStack.Navigator screenOptions={screenOptions}>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('navigation.settings'), headerShown: false }}
      />
      <SettingsStack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={{
          headerShown: true,
          headerTitle: t('settings.appearance.title'),
          headerTitleAlign: 'center',
          headerBackTitle: t('navigation.settings'),
        }}
      />
      <SettingsStack.Screen
        name="LanguageSelection"
        component={LanguageSelectionScreen}
        options={{
          headerShown: true,
          headerTitle: t('settings.languageSelection.title'),
          headerTitleAlign: 'center',
          headerBackTitle: t('navigation.settings'),
        }}
      />
      <SettingsStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: true,
          headerTitle: t('settings.about.title'),
          headerTitleAlign: 'center',
          headerBackTitle: t('navigation.settings'),
        }}
      />
      <SettingsStack.Screen
        name="Legal"
        component={LegalScreen}
        options={{
          headerShown: true,
          headerTitle: t('settings.legal.title'),
          headerTitleAlign: 'center',
          headerBackTitle: t('navigation.settings'),
        }}
      />
    </SettingsStack.Navigator>
  );
};
