import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AtomicText, AtomicIcon, useAppDesignTokens } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';

interface LoadingStateProps {
  icon?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ icon = 'Circle' }) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <AtomicIcon name={icon} size="xxl" color="secondary" />
      <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 16 }}>
        {t('general.loading')}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
});

