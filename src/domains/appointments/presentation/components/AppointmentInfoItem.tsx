import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AtomicIcon, AtomicText, useAppDesignTokens } from '@umituz/react-native-design-system';

interface AppointmentInfoItemProps {
  icon: string;
  value: string;
  label: string;
}

export const AppointmentInfoItem: React.FC<AppointmentInfoItemProps> = ({
  icon,
  value,
  label,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: tokens.colors.surfaceSecondary },
        ]}
      >
        <AtomicIcon name={icon as any} size="md" color="primary" />
      </View>
      <View style={styles.textContainer}>
        <AtomicText type="bodyMedium" color="textPrimary">
          {value}
        </AtomicText>
        <AtomicText type="bodySmall" color="textSecondary">
          {label}
        </AtomicText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
});

