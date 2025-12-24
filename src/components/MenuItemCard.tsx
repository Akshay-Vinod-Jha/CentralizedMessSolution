import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MenuItem, DietTag } from "../types";
import { theme } from "../utils/theme";

interface MenuItemCardProps {
  item: MenuItem;
  onPress?: () => void;
  showAddButton?: boolean;
  onAdd?: () => void;
  quantity?: number;
}

const dietTagColors: Record<DietTag, string> = {
  Veg: "#6BCF7F",
  "Non-Veg": "#E74C3C",
  Vegan: "#2A9D8F",
  Jain: "#F39C12",
  Halal: "#9B59B6",
};

const dietTagIcons: Record<DietTag, string> = {
  Veg: "🟢",
  "Non-Veg": "🔴",
  Vegan: "🌱",
  Jain: "🟠",
  Halal: "🌙",
};

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onPress,
  showAddButton = false,
  onAdd,
  quantity = 0,
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.container, !item.available && styles.unavailable]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!item.available}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.icon}>{dietTagIcons[item.dietTag]}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>

          <View
            style={[
              styles.dietBadge,
              { backgroundColor: dietTagColors[item.dietTag] + "20" },
            ]}
          >
            <Text
              style={[styles.dietText, { color: dietTagColors[item.dietTag] }]}
            >
              {item.dietTag}
            </Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.priceUnit}>tokens</Text>
          </View>

          {!item.available && (
            <Text style={styles.unavailableText}>Not Available</Text>
          )}

          {showAddButton && item.available && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={onAdd}
              activeOpacity={0.7}
            >
              {quantity > 0 ? (
                <View style={styles.quantityBadge}>
                  <Text style={styles.quantityText}>{quantity}</Text>
                </View>
              ) : (
                <Text style={styles.addButtonText}>Add +</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  unavailable: {
    opacity: 0.6,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  name: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    flex: 1,
  },
  dietBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  dietText: {
    ...theme.typography.caption,
    fontWeight: "600",
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginRight: theme.spacing.xs,
  },
  priceUnit: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  unavailableText: {
    ...theme.typography.body,
    color: theme.colors.error,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    minWidth: 70,
    alignItems: "center",
  },
  addButtonText: {
    ...theme.typography.body,
    color: theme.colors.surface,
    fontWeight: "600",
  },
  quantityBadge: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    minWidth: 30,
    alignItems: "center",
  },
  quantityText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: "700",
  },
});
