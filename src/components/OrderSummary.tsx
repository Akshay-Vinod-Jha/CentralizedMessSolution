import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { OrderItem } from "../types";
import { theme } from "../utils/theme";

interface OrderSummaryProps {
  items: OrderItem[];
  totalTokens: number;
  deliveryFee?: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalTokens,
  deliveryFee = 0,
}) => {
  const subtotal = totalTokens - deliveryFee;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      <View style={styles.itemsList}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              {item.quantity > 1 && (
                <Text style={styles.quantity}>× {item.quantity}</Text>
              )}
            </View>
            <Text style={styles.itemPrice}>
              {item.tokensPerItem * item.quantity} tokens
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>{subtotal} tokens</Text>
        </View>

        {deliveryFee > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery Fee</Text>
            <Text style={styles.totalValue}>{deliveryFee} tokens</Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.grandTotalLabel}>Total</Text>
          <Text style={styles.grandTotalValue}>{totalTokens} tokens</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  itemsList: {
    gap: theme.spacing.sm,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  itemName: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  quantity: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  itemPrice: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.md,
  },
  totalsSection: {
    gap: theme.spacing.sm,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  totalValue: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  grandTotalLabel: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    fontWeight: "600",
  },
  grandTotalValue: {
    ...theme.typography.h3,
    color: theme.colors.primary,
  },
});
