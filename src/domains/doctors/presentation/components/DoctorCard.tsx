import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText, useAppDesignTokens } from '@umituz/react-native-design-system';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  onPress?: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onPress }) => {
  const tokens = useAppDesignTokens();

  const content = (
    <View style={[styles.card, { backgroundColor: tokens.colors.surface }]}>
      <AtomicText type="headlineSmall" style={{ color: tokens.colors.textPrimary }}>
        {doctor.name}
      </AtomicText>
      {doctor.specialty && (
        <AtomicText type="bodyMedium" style={{ color: tokens.colors.textSecondary, marginTop: 4 }}>
          {doctor.specialty}
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

