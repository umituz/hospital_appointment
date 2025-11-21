import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText, useAppDesignTokens } from '@umituz/react-native-design-system';
import { Hospital } from '../../types';

interface HospitalCardProps {
  hospital: Hospital;
  onPress?: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onPress }) => {
  const tokens = useAppDesignTokens();

  const content = (
    <View style={[styles.card, { backgroundColor: tokens.colors.surface }]}>
      <AtomicText type="headlineSmall" style={{ color: tokens.colors.textPrimary }}>
        {hospital.name}
      </AtomicText>
      {hospital.address && (
        <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
          {hospital.address}
        </AtomicText>
      )}
      {hospital.phone && (
        <AtomicText type="bodySmall" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
          {hospital.phone}
        </AtomicText>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
});

