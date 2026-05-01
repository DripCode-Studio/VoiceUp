import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { usePetitionStore } from "../../store/usePetitionStore";
import { COLORS } from "../../utils/constants";

// Simple fallback guard UI mimicking Sovereign Advocate empty state
const AuthGuard = ({ onLogin, onRegister }: any) => (
  <View style={guardStyles.container}>
    <View style={guardStyles.iconWrap}>
      <MaterialIcons name="campaign" size={48} color={COLORS.primary} />
    </View>
    <Text style={guardStyles.title}>VoiceUp</Text>
    <Text style={guardStyles.subtitle}>
      Your voice matters. Log in to start drafting your movement and gather
      signatures.
    </Text>

    <TouchableOpacity style={guardStyles.btnPrimary} onPress={onLogin}>
      <Text style={guardStyles.btnPrimaryText}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity style={guardStyles.btnSecondary} onPress={onRegister}>
      <Text style={guardStyles.btnSecondaryText}>Create an Account</Text>
    </TouchableOpacity>
  </View>
);

const guardStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: COLORS.surface,
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: COLORS.onSurface,
    marginBottom: 16,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
  },
  btnPrimary: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    borderRadius: 32,
    alignItems: "center",
    marginBottom: 16,
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  btnSecondary: {
    paddingVertical: 16,
  },
  btnSecondaryText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});

export const CreatePetitionScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuthStore();
  const { addPetition } = usePetitionStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [goalSignatures, setGoalSignatures] = useState("1000");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidImageUrl = (url: string) => {
    if (!url.trim()) return false;
    const normalized = url.trim().toLowerCase();
    const isHttp =
      normalized.startsWith("http://") || normalized.startsWith("https://");
    const hasImageExtension = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/.test(
      normalized,
    );
    return isHttp && hasImageExtension;
  };

  if (!user) {
    return (
      <AuthGuard
        onLogin={() => navigation.navigate("Login", { returnTo: "CreateTab" })}
        onRegister={() =>
          navigation.navigate("Register", { returnTo: "CreateTab" })
        }
      />
    );
  }

  const handleCreate = async () => {
    if (isSubmitting) return;

    if (!title.trim() || !description.trim() || !imageUrl.trim()) {
      alert("Please fill out all fields, including a cover image URL");
      return;
    }

    if (!isValidImageUrl(imageUrl)) {
      alert(
        "Please provide a valid image URL ending with jpg, jpeg, png, webp, or gif.",
      );
      return;
    }

    const parsedGoal = Number.parseInt(goalSignatures, 10);
    if (!Number.isFinite(parsedGoal) || parsedGoal < 100) {
      alert("Goal signatures must be a number of at least 100.");
      return;
    }

    try {
      setIsSubmitting(true);
      addPetition({
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        goalSignatures: parsedGoal,
        authorId: user.id || "usr_x",
        authorName: user.name || "Anonymous User",
      });

      setTitle("");
      setDescription("");
      setImageUrl("");
      setGoalSignatures("1000");

      navigation.navigate("HomeTab");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
            <View style={styles.avatarWrap}>
              <Image
                source={require("../../../assets/AppIcons/playstore.png")}
                style={styles.avatarImg}
              />
            </View>
            <Text style={styles.appBarTitle}>VoiceUp</Text>
          </View>
          <TouchableOpacity style={styles.notiBtn}>
            <MaterialIcons
              name="notifications"
              size={24}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Editorial Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Draft Your{"\n"}Movement.</Text>
            <Text style={styles.headerSubtitle}>
              Every major change starts with a single voice. Be clear, be bold,
              and define the future you want to see.
            </Text>
          </View>

          {/* Creation Canvas */}
          <View style={styles.canvas}>
            {/* Title Section */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PETITION TITLE</Text>
              <TextInput
                style={[styles.input, styles.titleInput]}
                placeholder="What do you want to change?"
                placeholderTextColor={COLORS.outline}
                value={title}
                onChangeText={setTitle}
              />
              <Text style={styles.inputHint}>
                Make it punchy. 10 words or less is ideal.
              </Text>
            </View>

            {/* Image Placeholder */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>COVER IMAGE</Text>
              <View style={styles.imagePlaceholder}>
                <View style={styles.imageIconWrap}>
                  <MaterialIcons
                    name="add-a-photo"
                    size={32}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.imagePlaceholderTitle}>
                  Upload a compelling visual
                </Text>
                <Text style={styles.imagePlaceholderSub}>
                  Paste a direct image URL (JPG/PNG/WebP)
                </Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="https://example.com/your-image.jpg"
                placeholderTextColor={COLORS.outline}
                value={imageUrl}
                onChangeText={setImageUrl}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {imageUrl.trim().length > 0 && (
                <Image
                  source={{ uri: imageUrl.trim() }}
                  style={styles.imagePreview}
                />
              )}
            </View>

            {/* Description Section */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>THE STORY & GOAL</Text>
              <TextInput
                style={[styles.input, styles.descInput]}
                placeholder="Explain the issue, why it matters, and what the specific solution is..."
                placeholderTextColor={COLORS.outline}
                value={description}
                onChangeText={setDescription}
                multiline
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>SIGNATURE GOAL</Text>
              <TextInput
                style={[styles.input, styles.goalInput]}
                placeholder="1000"
                placeholderTextColor={COLORS.outline}
                value={goalSignatures}
                onChangeText={setGoalSignatures}
                keyboardType="number-pad"
              />
            </View>

            {/* Tips Bento Component */}
            <View style={styles.tipsGrid}>
              <View style={styles.tipCard}>
                <MaterialIcons
                  name="lightbulb"
                  size={24}
                  color={COLORS.primary}
                  style={{ marginTop: 2 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.tipTitle}>Be Specific</Text>
                  <Text style={styles.tipDesc}>
                    Address a specific person or organization that has the power
                    to make the change.
                  </Text>
                </View>
              </View>
              <View style={styles.tipCard}>
                <MaterialIcons
                  name="group"
                  size={24}
                  color={COLORS.primary}
                  style={{ marginTop: 2 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.tipTitle}>Stay Personal</Text>
                  <Text style={styles.tipDesc}>
                    People sign when they feel an emotional connection to your
                    story.
                  </Text>
                </View>
              </View>
            </View>

            {/* Primary Action */}
            <View style={styles.actionWrap}>
              <TouchableOpacity
                style={[
                  styles.launchBtn,
                  isSubmitting && styles.launchBtnDisabled,
                ]}
                activeOpacity={0.9}
                onPress={handleCreate}
                disabled={isSubmitting}
              >
                <Text style={styles.launchBtnText}>
                  {isSubmitting ? "Launching..." : "Launch Petition"}
                </Text>
                <MaterialIcons
                  name={isSubmitting ? "hourglass-top" : "rocket-launch"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                By launching, you agree to our Community Guidelines and Terms of
                Service.
              </Text>
            </View>
          </View>
          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerLowest, // The wireframe has a white background for create
  },
  container: {
    flex: 1,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: COLORS.surfaceContainerLowest,
  },
  appBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1d4ed8", // Custom blue
    letterSpacing: -0.5,
  },
  notiBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  headerSection: {
    marginBottom: 48,
  },
  headerTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.onSurface,
    lineHeight: 56,
    letterSpacing: -1,
    marginBottom: 20,
  },
  headerSubtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    lineHeight: 28,
  },
  canvas: {
    gap: 48,
  },
  inputGroup: {
    gap: 12,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderWidth: 0,
    color: COLORS.onSurface,
    lineHeight: 24,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
  },
  descInput: {
    fontSize: 18,
    height: 200,
    paddingTop: 20,
    lineHeight: 28,
  },
  goalInput: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  inputHint: {
    fontSize: 14,
    fontStyle: "italic",
    color: "rgba(67, 70, 85, 0.7)",
    marginTop: 10,
    lineHeight: 20,
  },
  imagePlaceholder: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#eff4ff",
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(195, 198, 215, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  imagePreview: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
  imageIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.surfaceContainerHighest,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.onSurface,
    lineHeight: 24,
  },
  imagePlaceholderSub: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  tipsGrid: {
    flexDirection: "column",
    gap: 16,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    backgroundColor: "#eff4ff",
    padding: 24,
    borderRadius: 24,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.onSurface,
    marginBottom: 6,
    lineHeight: 24,
  },
  tipDesc: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  actionWrap: {
    paddingTop: 24,
    paddingBottom: 48,
  },
  launchBtn: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingVertical: 24,
    borderRadius: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  launchBtnDisabled: {
    opacity: 0.7,
  },
  launchBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
  },
  termsText: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 16,
  },
});
