import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Petition } from '../services/mockData';
import { COLORS, SPACING, RADIUS } from '../utils/constants';

interface PetitionCardProps {
  petition: Petition;
  onPress: () => void;
}

export const PetitionCard = ({ petition, onPress }: PetitionCardProps) => {
  const progress = Math.min((petition.signaturesCount / petition.goalSignatures) * 100, 100);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.header}>
        <View style={styles.authorContainer}>
          <Feather name="user" size={14} color={COLORS.textSecondary} />
          <Text style={styles.author}>{petition.authorName}</Text>
        </View>
        <Text style={styles.date}>
          {new Date(petition.createdAt).toLocaleDateString()}
        </Text>
      </View>
      
      <Text style={styles.title} numberOfLines={2}>{petition.title}</Text>
      <Text style={styles.description} numberOfLines={3}>{petition.description}</Text>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.signatures}>
            <Text style={styles.signaturesHighlight}>{petition.signaturesCount.toLocaleString()}</Text> signed
          </Text>
          <Text style={styles.goal}>of {petition.goalSignatures.toLocaleString()} goal</Text>
        </View>
        
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  author: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  progressSection: {
    marginTop: 'auto',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  signatures: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  signaturesHighlight: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  goal: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.round,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.round,
  },
});
