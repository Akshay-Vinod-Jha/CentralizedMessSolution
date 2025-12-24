import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Mess, DietTag } from "../types";
import { theme } from "../utils/theme";

interface MessCardProps {
  mess: Mess;
  onPress: () => void;
}

const dietTagColors: Record<DietTag, string> = {
  Veg: "#6BCF7F",
  "Non-Veg": "#E74C3C",
  Vegan: "#2A9D8F",
  Jain: "#F39C12",
  Halal: "#9B59B6",
};

export const MessCard: React.FC<MessCardProps> = ({ mess, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {mess.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={theme.colors.warning} />
            <Text style={styles.rating}>{mess.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.location} numberOfLines={1}>
          <Ionicons
            name="location-outline"
            size={12}
            color={theme.colors.textSecondary}
          />{" "}
          {mess.location}
        </Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {mess.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.dietTags}>
          {mess.dietTags.slice(0, 3).map((tag) => (
            <View
              key={tag}
              style={[
                styles.dietTag,
                { backgroundColor: dietTagColors[tag] + "20" },
              ]}
            >
              <Text style={[styles.dietTagText, { color: dietTagColors[tag] }]}>
                {tag}
              </Text>
            </View>
          ))}
          {mess.dietTags.length > 3 && (
            <Text style={styles.moreTags}>+{mess.dietTags.length - 3}</Text>
          )}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{mess.pricePerMeal}</Text>
          <Text style={styles.priceUnit}>tokens/meal</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  header: {
    marginBottom: theme.spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  name: {
    ...theme.typography.h3,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  rating: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.colors.text,
  },
  location: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dietTags: {
    flexDirection: "row",
    gap: theme.spacing.xs,
    flex: 1,
    flexWrap: "wrap",
  },
  dietTag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  dietTagText: {
    ...theme.typography.caption,
    fontWeight: "600",
  },
  moreTags: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  priceContainer: {
    alignItems: "flex-end",
    marginLeft: theme.spacing.sm,
  },
  price: {
    ...theme.typography.h3,
    color: theme.colors.primary,
  },
  priceUnit: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
});
