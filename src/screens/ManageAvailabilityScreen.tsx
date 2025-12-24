import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

interface MealItem {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  quantity: number;
}

export const ManageAvailabilityScreen: React.FC<Props> = ({ navigation }) => {
  const [meals, setMeals] = useState<MealItem[]>([
    {
      id: "1",
      name: "Veg Thali",
      category: "Lunch",
      price: 6,
      available: true,
      quantity: 20,
    },
    {
      id: "2",
      name: "Chicken Biryani",
      category: "Lunch",
      price: 8,
      available: true,
      quantity: 15,
    },
    {
      id: "3",
      name: "Paneer Wrap",
      category: "Snacks",
      price: 5,
      available: false,
      quantity: 10,
    },
    {
      id: "4",
      name: "Dal Rice Combo",
      category: "Dinner",
      price: 6,
      available: true,
      quantity: 25,
    },
    {
      id: "5",
      name: "Roti Sabzi",
      category: "Dinner",
      price: 5,
      available: true,
      quantity: 30,
    },
    {
      id: "6",
      name: "Breakfast Combo",
      category: "Breakfast",
      price: 4,
      available: true,
      quantity: 20,
    },
  ]);

  const toggleAvailability = (id: string) => {
    setMeals(
      meals.map((meal) =>
        meal.id === id ? { ...meal, available: !meal.available } : meal
      )
    );
  };

  const updateQuantity = (id: string, change: number) => {
    setMeals(
      meals.map((meal) =>
        meal.id === id
          ? { ...meal, quantity: Math.max(0, meal.quantity + change) }
          : meal
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Availability</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle"
            size={24}
            color={theme.colors.primary}
          />
          <Text style={styles.infoText}>
            Toggle meals on/off and set daily quantities available for students
          </Text>
        </View>

        {["Breakfast", "Lunch", "Snacks", "Dinner"].map((category) => {
          const categoryMeals = meals.filter((m) => m.category === category);
          if (categoryMeals.length === 0) return null;

          return (
            <View key={category} style={styles.section}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {categoryMeals.map((meal) => (
                <View key={meal.id} style={styles.mealCard}>
                  <View style={styles.mealInfo}>
                    <View style={styles.mealHeader}>
                      <Text style={styles.mealName}>{meal.name}</Text>
                      <Text style={styles.mealPrice}>{meal.price} tokens</Text>
                    </View>

                    <View style={styles.quantityControl}>
                      <Text style={styles.quantityLabel}>Available Qty:</Text>
                      <View style={styles.quantityButtons}>
                        <TouchableOpacity
                          style={styles.quantityBtn}
                          onPress={() => updateQuantity(meal.id, -5)}
                        >
                          <Ionicons
                            name="remove"
                            size={20}
                            color={theme.colors.primary}
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantityValue}>
                          {meal.quantity}
                        </Text>
                        <TouchableOpacity
                          style={styles.quantityBtn}
                          onPress={() => updateQuantity(meal.id, 5)}
                        >
                          <Ionicons
                            name="add"
                            size={20}
                            color={theme.colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.availabilityToggle}>
                    <Switch
                      value={meal.available}
                      onValueChange={() => toggleAvailability(meal.id)}
                      trackColor={{
                        false: theme.colors.textLight,
                        true: theme.colors.primary,
                      }}
                      thumbColor={
                        meal.available
                          ? theme.colors.surface
                          : theme.colors.textSecondary
                      }
                    />
                    <Text
                      style={[
                        styles.availabilityText,
                        {
                          color: meal.available
                            ? theme.colors.success
                            : theme.colors.textSecondary,
                        },
                      ]}
                    >
                      {meal.available ? "Available" : "Unavailable"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  content: {
    flex: 1,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary + "10",
    margin: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  categoryTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  mealCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  mealInfo: {
    flex: 1,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  mealName: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    fontWeight: "600",
  },
  mealPrice: {
    ...theme.typography.body,
    color: theme.colors.accent,
    fontWeight: "600",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  quantityLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  quantityButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityValue: {
    ...theme.typography.h3,
    color: theme.colors.text,
    minWidth: 40,
    textAlign: "center",
  },
  availabilityToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background,
  },
  availabilityText: {
    ...theme.typography.body,
    fontWeight: "600",
  },
});
