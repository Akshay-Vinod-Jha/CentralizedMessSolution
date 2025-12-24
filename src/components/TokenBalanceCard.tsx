import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";

interface TokenBalanceCardProps {
  balance: number;
  onPress?: () => void;
  compact?: boolean;
}

export const TokenBalanceCard: React.FC<TokenBalanceCardProps> = ({
  balance,
  onPress,
  compact = false,
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  if (compact) {
    return (
      <CardComponent
        style={styles.compactContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.compactContent}>
          <Ionicons
            name="wallet-outline"
            size={20}
            color={theme.colors.primary}
          />
          <Text style={styles.compactBalance}>{balance}</Text>
          <Text style={styles.compactLabel}>tokens</Text>
        </View>
      </CardComponent>
    );
  }

  return (
    <CardComponent
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="wallet" size={32} color={theme.colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Available Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.unit}>tokens</Text>
        </View>
      </View>

      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={24}
          color={theme.colors.textSecondary}
        />
      )}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.medium,
  },
  compactContainer: {
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  compactContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  compactBalance: {
    ...theme.typography.subtitle,
    color: theme.colors.primary,
    fontWeight: "700",
  },
  compactLabel: {
    ...theme.typography.caption,
    color: theme.colors.primary,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  balance: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginRight: theme.spacing.xs,
  },
  unit: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
});
