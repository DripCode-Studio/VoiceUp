import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "../utils/constants";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export const PrimaryButton = ({
  title,
  onPress,
  disabled,
  loading,
  variant = "primary",
}: PrimaryButtonProps) => {
  const getBackgroundColor = () => {
    if (disabled) return COLORS.border;
    if (variant === "secondary") return COLORS.surface;
    if (variant === "danger") return COLORS.danger;
    return COLORS.primary;
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textSecondary;
    if (variant === "secondary") return COLORS.text;
    return COLORS.surface;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === "secondary" && styles.border,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
});
