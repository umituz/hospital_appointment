import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AtomicText, AtomicIcon, useAppDesignTokens } from '@umituz/react-native-design-system';
import { useLocalization } from '@umituz/react-native-localization';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <AtomicIcon name={icon} size="xxl" color="secondary" />
      <AtomicText type="headlineSmall" style={{ color: tokens.colors.textSecondary, marginTop: 16 }}>
        {t(title)}
      </AtomicText>
      {description && (
        <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 8 }}>
          {t(description)}
        </AtomicText>
      )}
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

