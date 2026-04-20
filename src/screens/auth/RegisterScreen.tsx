import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { COLORS } from "../../utils/constants";

export const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const returnTo = route.params?.returnTo || "HomeTab";

  const { login } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (name && email && password) {
      // Mock registration logic
      login({ id: String(Date.now()), name, email });
      if (returnTo === "goBack") {
        navigation.goBack();
      } else {
        navigation.navigate(returnTo);
      }
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.appBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Join the Movement</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.brandBlock}>
            <View style={styles.iconBox}>
              <MaterialIcons
                name="record-voice-over"
                size={40}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.brandTitle}>Join the{"\n"}Movement</Text>
            <Text style={styles.brandSubtitle}>
              Create an account to start and sign petitions.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>FULL NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Jane Doe"
                placeholderTextColor={COLORS.outline}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
              <TextInput
                style={styles.input}
                placeholder="jane@example.com"
                placeholderTextColor={COLORS.outline}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={COLORS.outline}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Text style={styles.termsText}>
              By creating an account, you agree to our{" "}
              <Text style={styles.termsHighlight}>Terms of Service</Text> and{" "}
              <Text style={styles.termsHighlight}>Privacy Policy</Text>.
            </Text>

            <TouchableOpacity
              style={styles.registerBtn}
              activeOpacity={0.9}
              onPress={handleRegister}
            >
              <Text style={styles.registerBtnText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerLink}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login", { returnTo })}
            >
              <Text style={styles.footerHighlight}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  container: {
    flex: 1,
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.onSurface,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  brandBlock: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 74, 198, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },
  brandTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.onSurface,
    lineHeight: 56,
    letterSpacing: -1,
    textAlign: "center",
    marginBottom: 20,
  },
  brandSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 26,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 32,
    padding: 32,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 32 },
    shadowOpacity: 0.04,
    shadowRadius: 48,
    elevation: 4,
    gap: 28,
  },
  inputGroup: {
    gap: 10,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.onSurface,
    letterSpacing: 1,
    lineHeight: 16,
  },
  input: {
    height: 56,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 16,
    color: COLORS.onSurface,
    lineHeight: 24,
  },
  termsText: {
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  termsHighlight: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  registerBtn: {
    width: "100%",
    height: 64,
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  registerBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
  },
  footerLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  footerHighlight: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
    lineHeight: 24,
  },
});
