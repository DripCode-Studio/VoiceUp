import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MOCK_PETITIONS } from "../../services/mockData";
import { usePetitionStore } from "../../store/usePetitionStore";
import { COLORS } from "../../utils/constants";

export const AllPetitionsScreen = () => {
  const navigation = useNavigation<any>();
  const { petitions, isLoading, fetchPetitions } = usePetitionStore();

  useEffect(() => {
    if (petitions.length === 0) {
      fetchPetitions();
    }
  }, [fetchPetitions, petitions.length]);

  const allPetitions = petitions.length > 0 ? petitions : MOCK_PETITIONS;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>

        <View style={styles.headerTextWrap}>
          <Text style={styles.headerOverline}>Directory</Text>
          <Text style={styles.headerTitle}>All Petitions</Text>
        </View>
      </View>

      <Text style={styles.countText}>
        {allPetitions.length} campaigns available
      </Text>

      <FlatList
        data={allPetitions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const progress = Math.min(
            (item.signaturesCount / item.goalSignatures) * 100,
            100,
          );

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("PetitionDetails", { id: item.id })
              }
            >
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />

              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>

              <Text style={styles.cardDescription} numberOfLines={3}>
                {item.description}
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>By {item.authorName}</Text>
                <Text style={styles.metaText}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.progressHeader}>
                <Text style={styles.progressPrimary}>
                  {item.signaturesCount.toLocaleString()} signed
                </Text>
                <Text style={styles.progressSecondary}>
                  Goal {item.goalSignatures.toLocaleString()}
                </Text>
              </View>

              <View style={styles.progressBg}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No petitions yet</Text>
              <Text style={styles.emptyDescription}>
                Create the first petition and rally support.
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceContainer,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerOverline: {
    color: COLORS.primary,
    fontWeight: "700",
    letterSpacing: 1.6,
    fontSize: 10,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: COLORS.onSurface,
  },
  countText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "800",
    color: COLORS.onSurface,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
    marginBottom: 18,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  metaText: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressPrimary: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "700",
    lineHeight: 16,
  },
  progressSecondary: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "600",
    lineHeight: 16,
  },
  progressBg: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  emptyState: {
    paddingVertical: 80,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
