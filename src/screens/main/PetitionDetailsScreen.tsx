import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Avatar } from '../../components/Avatar';
import { InputField } from '../../components/InputField';
import { useAuthStore } from '../../store/useAuthStore';
import { usePetitionStore } from '../../store/usePetitionStore';
import { COLORS, SPACING, RADIUS } from '../../utils/constants';

type AppStackParamList = {
  PetitionDetails: { id: string };
};

export const PetitionDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<AppStackParamList, 'PetitionDetails'>>();
  
  const petitionId = route.params.id;
  const user = useAuthStore(state => state.user);
  const { petitions, signPetition, signedPetitionIds, isLoading } = usePetitionStore();
  
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const petition = petitions.find(p => p.id === petitionId);
  const hasSigned = signedPetitionIds.includes(petitionId);

  if (!petition) {
    return (
      <View style={styles.errorContainer}>
        <Text>Petition not found.</Text>
      </View>
    );
  }

  const handleSign = async () => {
    if (!user && (!guestName || !guestEmail)) {
      Alert.alert('Required', 'Please provide your name and email to sign this petition.');
      return;
    }

    try {
      if (user) {
        await signPetition(petition.id);
      } else {
        await signPetition(petition.id, guestName, guestEmail);
      }
      Alert.alert('Success', 'Thank you for signing this petition!');
    } catch (error: any) {
      Alert.alert('Notice', error.message);
    }
  };

  const progress = Math.min((petition.signaturesCount / petition.goalSignatures) * 100, 100);

  return (
    <View style={styles.container}>
      <Header title="Petition Details" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.authorSection}>
          <Avatar name={petition.authorName} size={40} />
          <View style={styles.authorInfo}>
            <Text style={styles.authorLabel}>Started by</Text>
            <Text style={styles.authorName}>{petition.authorName}</Text>
          </View>
          <Text style={styles.date}>{new Date(petition.createdAt).toLocaleDateString()}</Text>
        </View>

        <Text style={styles.title}>{petition.title}</Text>

        <View style={styles.statsCard}>
          <Text style={styles.signaturesCount}>
            {petition.signaturesCount.toLocaleString()} <Text style={styles.signaturesLabel}>have signed. Let's get to {petition.goalSignatures.toLocaleString()}!</Text>
          </Text>
          
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          
          {!user && !hasSigned && (
            <View style={styles.guestForm}>
              <Text style={styles.guestFormTitle}>Sign this petition</Text>
              <InputField 
                placeholder="Full Name" 
                value={guestName} 
                onChangeText={setGuestName} 
              />
              <InputField 
                placeholder="Email Address" 
                value={guestEmail} 
                onChangeText={setGuestEmail} 
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}

          <View style={styles.buttonContainer}>
             <PrimaryButton 
               title={hasSigned ? "You've Signed This" : "Sign this Petition"}
               onPress={handleSign}
               disabled={hasSigned}
               loading={isLoading}
             />
          </View>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Why this is important</Text>
          <Text style={styles.description}>{petition.description}</Text>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  authorInfo: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  authorLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 32,
    marginBottom: SPACING.xl,
  },
  statsCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
  },
  signaturesCount: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  signaturesLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.round,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.round,
  },
  buttonContainer: {
    marginTop: SPACING.xs,
  },
  guestForm: {
    marginBottom: SPACING.md,
  },
  guestFormTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  contentSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
});
