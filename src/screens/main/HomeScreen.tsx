import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MOCK_PETITIONS } from "../../services/mockData";
import { COLORS } from "../../utils/constants";

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const featuredPetition = MOCK_PETITIONS[0];
  const secondPetition = MOCK_PETITIONS[1];
  const thirdPetition = MOCK_PETITIONS[2];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOXPN2Po219NrnOrneqwLWH868iwi6OIyMRn4j-r1JN9OnwxFEO30hw2Qe1o6LW8Fk7and17dGDvdb6NPR8vsLB_8i3xWaxN761xNxd9ojXd_HUWMJ9kMNQJyPaFhWnagfvh6spI8OnGb75PbvLQxsdAqub7SAcq6v6O4zflbF_IfN2N25i7YuRomMpIb_5sPZKjkuEws3bN270gVQ0PIERKZi3mjK9dDERG0zEBWcYuD5GN-SHykmqP9nJUEeNohcWTdh8rsH6g_o",
            }}
            style={styles.avatar}
          />
          <Text style={styles.brandTitle}>VoiceUp</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <MaterialIcons
            name="notifications"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Editorial Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Sovereignty of the{"\n"}
            <Text style={styles.heroTitleAccent}>Collective Voice.</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Every signature is a testament to shared resolve. We elevate
            grassroots movements into institutional mandates through the power
            of intentional advocacy.
          </Text>
        </View>

        {/* Trending Petitions Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeadingBlock}>
            <Text style={styles.sectionOverline}>Curation</Text>
            <Text style={styles.sectionTitle}>Trending Petitions</Text>
          </View>
        </View>

        {/* Petition Cards */}
        <View style={styles.smallCardsContainer}>
          <TouchableOpacity
            style={styles.smallCardWrap}
            activeOpacity={0.95}
            onPress={() =>
              navigation.navigate("PetitionDetails", {
                id: featuredPetition?.id ?? "p1",
              })
            }
          >
            <View style={styles.smallCardInner}>
              <Image
                source={{
                  uri:
                    featuredPetition?.imageUrl ??
                    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
                }}
                style={styles.smallCardImage}
              />
              <Text style={styles.smallCardTitle}>
                {featuredPetition?.title ??
                  "Protect the Remaining Old Growth Forests in the Northern Sector"}
              </Text>
              <Text style={styles.smallCardDesc} numberOfLines={2}>
                {featuredPetition?.description ??
                  "The proposed logging expansion threatens an ecosystem that has stood for over 400 years. We demand immediate heritage status designation."}
              </Text>
              <View style={styles.smallCardBottom}>
                <View style={styles.progressBarBgSm}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${Math.min(
                          ((featuredPetition?.signaturesCount ?? 85240) /
                            (featuredPetition?.goalSignatures ?? 100000)) *
                            100,
                          100,
                        )}%`,
                      },
                    ]}
                  />
                </View>
                <View style={styles.progressHeader}>
                  <Text style={styles.smallProgressText}>
                    {(
                      featuredPetition?.signaturesCount ?? 85240
                    ).toLocaleString()}{" "}
                    SIGNED
                  </Text>
                  <Text style={styles.smallProgressText}>
                    GOAL{" "}
                    {(
                      featuredPetition?.goalSignatures ?? 100000
                    ).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallCardWrap}
            activeOpacity={0.95}
            onPress={() =>
              navigation.navigate("PetitionDetails", {
                id: secondPetition?.id ?? "p2",
              })
            }
          >
            <View style={styles.smallCardInner}>
              <Image
                source={{
                  uri:
                    secondPetition?.imageUrl ??
                    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
                }}
                style={styles.smallCardImage}
              />
              <Text style={styles.smallCardTitle}>
                {secondPetition?.title ??
                  "Universal Access to Mental Healthcare in Public Schools"}
              </Text>
              <Text style={styles.smallCardDesc} numberOfLines={2}>
                {secondPetition?.description ??
                  "Integrating licensed therapists into every primary and secondary campus nationwide."}
              </Text>
              <View style={styles.smallCardBottom}>
                <View style={styles.progressBarBgSm}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${Math.min(
                          ((secondPetition?.signaturesCount ?? 4200) /
                            (secondPetition?.goalSignatures ?? 10000)) *
                            100,
                          100,
                        )}%`,
                      },
                    ]}
                  />
                </View>
                <View style={styles.progressHeader}>
                  <Text style={styles.smallProgressText}>
                    {(secondPetition?.signaturesCount ?? 4200).toLocaleString()}{" "}
                    SIGNED
                  </Text>
                  <Text style={styles.smallProgressText}>
                    GOAL{" "}
                    {(secondPetition?.goalSignatures ?? 10000).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallCardWrap}
            activeOpacity={0.95}
            onPress={() =>
              navigation.navigate("PetitionDetails", {
                id: thirdPetition?.id ?? "p3",
              })
            }
          >
            <View style={styles.smallCardInner}>
              <Image
                source={{
                  uri:
                    thirdPetition?.imageUrl ??
                    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
                }}
                style={styles.smallCardImage}
              />
              <Text style={styles.smallCardTitle}>
                {thirdPetition?.title ??
                  "Mandatory Urban Green Space in All New Developments"}
              </Text>
              <Text style={styles.smallCardDesc} numberOfLines={2}>
                {thirdPetition?.description ??
                  "Proposing a law requiring 20% of urban construction plots to be dedicated public parks."}
              </Text>
              <View style={styles.smallCardBottom}>
                <View style={styles.progressBarBgSm}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${Math.min(
                          ((thirdPetition?.signaturesCount ?? 17800) /
                            (thirdPetition?.goalSignatures ?? 25000)) *
                            100,
                          100,
                        )}%`,
                      },
                    ]}
                  />
                </View>
                <View style={styles.progressHeader}>
                  <Text style={styles.smallProgressText}>
                    {(thirdPetition?.signaturesCount ?? 17800).toLocaleString()}{" "}
                    SIGNED
                  </Text>
                  <Text style={styles.smallProgressText}>
                    GOAL{" "}
                    {(thirdPetition?.goalSignatures ?? 25000).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Signature Milestone Alert */}
        <View style={styles.alertCard}>
          <View style={styles.alertCardContent}>
            <Text style={styles.alertTitle}>The 100k Milestone</Text>
            <Text style={styles.alertDesc}>
              Three of our community led petitions reached the National Senate
              review board this morning. Your signature carries the weight of
              change.
            </Text>
            <TouchableOpacity style={styles.alertBtn}>
              <Text style={styles.alertBtnText}>See the Victories</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacer for safe area regarding bottom nav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB - Floating Action Button for Create */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("CreateTab")}
      >
        <MaterialIcons name="add" size={32} color="#fff" />
      </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.02)",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.primaryContainer,
    letterSpacing: -0.5,
  },
  notificationBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  heroSection: {
    marginBottom: 64,
  },
  heroTitle: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "900",
    color: COLORS.onSurface,
    letterSpacing: -1,
    marginBottom: 32,
  },
  heroTitleAccent: {
    color: "#004ac6",
    fontStyle: "italic",
  },
  heroSubtitle: {
    fontSize: 17,
    fontWeight: "300",
    lineHeight: 28,
    color: "#434655",
    marginLeft: 0,
    paddingRight: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 36,
  },
  sectionHeadingBlock: {
    minWidth: 0,
  },
  sectionOverline: {
    color: COLORS.primary,
    fontWeight: "700",
    letterSpacing: 2,
    fontSize: 10,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.onSurface,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBarBgSm: {
    height: 6,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  smallCardsContainer: {
    gap: 24,
    marginBottom: 64,
  },
  smallCardWrap: {
    backgroundColor: "#eff4ff",
    borderRadius: 32,
    padding: 4,
  },
  smallCardInner: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 28,
  },
  smallCardImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
    marginBottom: 16,
  },
  smallCardTitle: {
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 26,
    color: COLORS.onSurface,
    marginBottom: 12,
  },
  smallCardDesc: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  smallCardBottom: {
    marginTop: 16,
  },
  smallProgressText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: COLORS.textSecondary,
  },
  alertCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 48,
    padding: 44,
    overflow: "hidden",
    marginBottom: 48,
  },
  alertCardContent: {
    zIndex: 10,
  },
  alertTitle: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    fontStyle: "italic",
    marginBottom: 20,
    lineHeight: 40,
  },
  alertDesc: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 32,
  },
  alertBtn: {
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  alertBtnText: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    bottom: 110,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
});
