import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { Mess, MenuItem, DietTag } from "../types";
import { getMesses, getMenuItemsByMessId } from "../utils/storage";
import { MenuItemCard } from "../components";

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: { messId: string } }, "params">;
};

const dietTagColors: Record<DietTag, string> = {
  Veg: "#6BCF7F",
  "Non-Veg": "#E74C3C",
  Vegan: "#2A9D8F",
  Jain: "#F39C12",
  Halal: "#9B59B6",
};

export const MessDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { messId } = route.params;
  const [mess, setMess] = useState<Mess | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    loadMessDetails();
  }, [messId]);

  const loadMessDetails = async () => {
    const allMesses = await getMesses();
    const foundMess = allMesses.find((m) => m.id === messId);
    setMess(foundMess || null);

    const items = await getMenuItemsByMessId(messId);
    setMenuItems(items);
  };

  const categories = [
    { id: "all", label: "All Items" },
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" },
    { id: "snacks", label: "Snacks" },
  ];

  const filteredMenuItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const handleOrderNow = () => {
    if (mess) {
      navigation.navigate("OrderMeal", {
        messId: mess.id,
        messName: mess.name,
      });
    }
  };

  if (!mess) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {mess.name}
        </Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Mess Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View style={styles.nameRow}>
              <Text style={styles.messName}>{mess.name}</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={18} color={theme.colors.warning} />
                <Text style={styles.ratingText}>{mess.rating.toFixed(1)}</Text>
              </View>
            </View>

            <Text style={styles.description}>{mess.description}</Text>

            <View style={styles.infoRow}>
              <Ionicons
                name="location"
                size={16}
                color={theme.colors.textSecondary}
              />
              <Text style={styles.infoText}>{mess.location}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons
                name="time"
                size={16}
                color={theme.colors.textSecondary}
              />
              <Text style={styles.infoText}>{mess.openingHours}</Text>
            </View>

            <View style={styles.dietTagsContainer}>
              {mess.dietTags.map((tag) => (
                <View
                  key={tag}
                  style={[
                    styles.dietTagBadge,
                    { backgroundColor: dietTagColors[tag] + "20" },
                  ]}
                >
                  <Text
                    style={[styles.dietTagText, { color: dietTagColors[tag] }]}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.priceInfo}>
              <Text style={styles.priceLabel}>Average Price:</Text>
              <Text style={styles.priceValue}>
                {mess.pricePerMeal} tokens/meal
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menu</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category.id &&
                      styles.categoryChipTextActive,
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.menuItems}>
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onPress={() =>
                    navigation.navigate("MealCustomization", {
                      menuItem: item,
                      messId: mess.id,
                      messName: mess.name,
                    })
                  }
                />
              ))
            ) : (
              <View style={styles.emptyMenu}>
                <Ionicons
                  name="restaurant-outline"
                  size={48}
                  color={theme.colors.textLight}
                />
                <Text style={styles.emptyText}>No items in this category</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={handleOrderNow}
          activeOpacity={0.8}
        >
          <Text style={styles.orderButtonText}>Order Now</Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={theme.colors.surface}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    flex: 1,
    marginHorizontal: theme.spacing.md,
    textAlign: "center",
  },
  favoriteButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  infoHeader: {
    padding: theme.spacing.lg,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  messName: {
    ...theme.typography.h2,
    color: theme.colors.text,
    flex: 1,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
  },
  ratingText: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    fontWeight: "600",
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  dietTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  dietTagBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  dietTagText: {
    ...theme.typography.body,
    fontWeight: "600",
  },
  priceInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.primaryLight,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  priceLabel: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  priceValue: {
    ...theme.typography.h3,
    color: theme.colors.primary,
  },
  menuSection: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  categoriesContainer: {
    marginBottom: theme.spacing.lg,
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    marginRight: theme.spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryChipText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  categoryChipTextActive: {
    color: theme.colors.surface,
    fontWeight: "600",
  },
  menuItems: {
    marginTop: theme.spacing.md,
  },
  emptyMenu: {
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.large,
  },
  orderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  orderButtonText: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
    fontWeight: "600",
  },
});
