import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SettingsScreen as PackageSettingsScreen } from '@umituz/react-native-settings';
import type { CustomSettingsSection } from '@umituz/react-native-settings';
import { SettingItem } from '@umituz/react-native-settings';
import { Palette, Info, FileText, RotateCcw } from 'lucide-react-native';
import { useLocalization } from '@umituz/react-native-localization';
import { useOnboarding } from '@umituz/react-native-onboarding';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const { reset: resetOnboarding } = useOnboarding();

  const handleResetOnboarding = async () => {
    try {
      await resetOnboarding('@hospital_appointment_onboarding_completed');
      navigation.navigate('Onboarding' as never);
    } catch (error) {
      Alert.alert(t('errors.general'), t('settings.resetOnboarding.error'));
    }
  };

  const customSections: CustomSettingsSection[] = [
    {
      title: t('settings.sections.app.title'),
      order: 1,
      content: (
        <>
          <SettingItem
            icon={Palette}
            title={t('settings.appearance.title')}
            value={t('settings.appearance.description')}
            onPress={() => navigation.navigate('Appearance' as never)}
          />
          <SettingItem
            icon={Info}
            title={t('settings.about.title')}
            value={t('settings.about.description')}
            onPress={() => navigation.navigate('About' as never)}
          />
          <SettingItem
            icon={FileText}
            title={t('settings.legal.title')}
            value={t('settings.legal.description')}
            onPress={() => navigation.navigate('Legal' as never)}
          />
          {__DEV__ && (
            <SettingItem
              icon={RotateCcw}
              title={t('settings.resetOnboarding.title')}
              value={t('settings.resetOnboarding.description')}
              onPress={handleResetOnboarding}
              iconColor="#F59E0B"
              titleColor="#F59E0B"
              isLast={true}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <PackageSettingsScreen
      showUserProfile={false}
      customSections={customSections}
      config={{
        appearance: false,
        notifications: false,
        about: false,
        legal: false,
      }}
      showCloseButton={false}
    />
  );
};

