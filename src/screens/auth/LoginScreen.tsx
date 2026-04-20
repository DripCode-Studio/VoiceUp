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

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const returnTo = route.params?.returnTo || "HomeTab";

  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateAfterAuth = () => {
    if (returnTo === "goBack") {
      navigation.goBack();
      return;
    }

    navigation.navigate("Tabs", {
      screen: returnTo,
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill out all fields");
      return;
    }

    try {
      await login(email.trim().toLowerCase());
      navigateAfterAuth();
    } catch {
      alert("Login failed. Please use a registered email.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Simple Top Nav since bottom nav is suppressed */}
        <View style={styles.appBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.brandBlock}>
            <View style={styles.iconBox}>
              <MaterialIcons name="campaign" size={40} color="#fff" />
            </View>
            <Text style={styles.brandTitle}>VoiceUp</Text>
            <Text style={styles.brandSubtitle}>Welcome back</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Minimalist stacked inputs */}
            <View style={styles.inputStack}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputFloatLabel}>EMAIL ADDRESS</Text>
                <TextInput
                  style={styles.input}
                  placeholder="name@company.com"
                  placeholderTextColor="rgba(115, 118, 134, 0.4)"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.inputWrapper}>
                <Text style={styles.inputFloatLabel}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="rgba(115, 118, 134, 0.4)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.actionBlock}>
              <TouchableOpacity
                style={styles.loginBtn}
                activeOpacity={0.9}
                onPress={handleLogin}
              >
                <Text style={styles.loginBtnText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.rowBetween}>
                <Text style={styles.rememberText}>Remember me</Text>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </View>
            </View>
          </View>

          <View style={styles.footerLink}>
            <Text style={styles.footerText}>New to the movement? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register", { returnTo })}
            >
              <Text style={styles.footerHighlight}>Create an account</Text>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
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
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  brandTitle: {
    fontSize: 56,
    fontWeight: "900",
    color: COLORS.onSurface,
    letterSpacing: -2,
    marginBottom: 12,
    lineHeight: 64,
  },
  brandSubtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.textSecondary,
    lineHeight: 26,
  },
  formContainer: {
    width: "100%",
  },
  inputStack: {
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(115, 118, 134, 0.15)",
    marginBottom: 28,
  },
  inputWrapper: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 18,
    position: "relative",
  },
  inputFloatLabel: {
    position: "absolute",
    top: 12,
    left: 16,
    fontSize: 10,
    fontWeight: "800",
    color: "rgba(67, 70, 85, 0.7)",
    letterSpacing: 1,
  },
  input: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.onSurface,
    padding: 0,
    margin: 0,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(195, 198, 215, 0.4)",
    marginHorizontal: 16,
  },
  actionBlock: {
    gap: 24,
  },
  loginBtn: {
    width: "100%",
    backgroundColor: COLORS.primary,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  rememberText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    lineHeight: 20,
  },
  footerLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 48,
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
    color: COLORS.onSurface,
    lineHeight: 24,
  },
});
