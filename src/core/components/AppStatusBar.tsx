import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme, useAppDesignTokens } from '@umituz/react-native-design-system-theme';

export const AppStatusBar: React.FC = () => {
  const { themeMode } = useTheme();
  const tokens = useAppDesignTokens();

  return (
    <StatusBar
      barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
      backgroundColor={tokens.colors.backgroundPrimary}
    />
  );
};
