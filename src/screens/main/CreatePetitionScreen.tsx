import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InputField } from '../../components/InputField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Header } from '../../components/Header';
import { useAuthStore } from '../../store/useAuthStore';
import { usePetitionStore } from '../../store/usePetitionStore';
import { COLORS, SPACING, RADIUS } from '../../utils/constants';

export const CreatePetitionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const user = useAuthStore(state => state.user);
  const { createPetition, isLoading } = usePetitionStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('5000');

  const handleSubmit = async () => {
    if (!title || !description || !goal) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    
    const goalNumber = parseInt(goal, 10);
    if (isNaN(goalNumber) || goalNumber < 10) {
      Alert.alert('Error', 'Please enter a valid signature goal (min 10)');
      return;
    }

    try {
      await createPetition(title, description, goalNumber);
      Alert.alert('Success', 'Your petition has been published!', [
        { text: 'OK', onPress: () => navigation.navigate('HomeTab') }
      ]);
      // Reset form
      setTitle('');
      setDescription('');
      setGoal('5000');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  if (!user) {
    return (
      <View style={styles.authContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Start a Petition</Text>
        </View>
        <View style={styles.authPromptContent}>
          <Text style={styles.authPromptTitle}>You need an account</Text>
          <Text style={styles.authPromptText}>Log in or sign up to create and manage your petitions.</Text>
          <PrimaryButton 
            title="Log In / Sign Up" 
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Start a Petition</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Great petitions have a clear goal and compelling story. Make sure to explain why this issue matters.
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Petition Title"
            placeholder="e.g. Save the Local Community Center"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          <InputField
            label="Signature Goal"
            placeholder="5000"
            value={goal}
            onChangeText={setGoal}
            keyboardType="number-pad"
          />

          <InputField
            label="Why is this important?"
            placeholder="Explain the problem and the solution you're proposing..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            style={[styles.textArea]}
            textAlignVertical="top"
          />
        </View>

        <PrimaryButton 
          title="Publish Petition" 
          onPress={handleSubmit}
          loading={isLoading}
        />
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  infoBox: {
    backgroundColor: '#E0F2FE', // Light blue tint
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.xl,
  },
  infoText: {
    color: '#0369A1',
    lineHeight: 20,
    fontSize: 14,
  },
  form: {
    marginBottom: SPACING.xl,
  },
  textArea: {
    height: 150,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
  },
  authContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  authPromptContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  authPromptTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  authPromptText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
});
