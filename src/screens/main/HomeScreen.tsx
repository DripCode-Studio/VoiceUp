import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PetitionCard } from '../../components/PetitionCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { usePetitionStore } from '../../store/usePetitionStore';
import { COLORS, SPACING } from '../../utils/constants';

type AppStackParamList = {
  Tabs: undefined;
  PetitionDetails: { id: string };
};

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { petitions, fetchPetitions, isLoading } = usePetitionStore();

  useEffect(() => {
    fetchPetitions();
  }, []);

  if (isLoading && petitions.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Trending Petitions</Text>
      <FlatList
        data={petitions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPetitions} />
        }
        renderItem={({ item }) => (
          <PetitionCard
            petition={item}
            onPress={() => navigation.navigate('PetitionDetails', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No petitions found. Be the first to start one!</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    padding: SPACING.md,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  list: {
    padding: SPACING.md,
    paddingTop: 0,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});
