import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

interface AvatarProps {
  name: string;
  size?: number;
}

export const Avatar = ({ name, size = 48 }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <View style={[
      styles.container, 
      { width: size, height: size, borderRadius: size / 2 }
    ]}>
      <Text style={[styles.text, { fontSize: size * 0.4 }]}>
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.surface,
    fontWeight: '700',
  },
});
