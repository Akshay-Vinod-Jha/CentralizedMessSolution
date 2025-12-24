import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
}

export const SetPricingScreen: React.FC<Props> = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", name: "Veg Thali", category: "Lunch", price: 6, cost: 3 },
    { id: "2", name: "Chicken Biryani", category: "Lunch", price: 8, cost: 5 },
    { id: "3", name: "Paneer Wrap", category: "Snacks", price: 5, cost: 2.5 },
    { id: "4", name: "Dal Rice Combo", category: "Dinner", price: 6, cost: 3 },
    { id: "5", name: "Roti Sabzi", category: "Dinner", price: 5, cost: 2 },
    {
      id: "6",
      name: "Breakfast Combo",
      category: "Breakfast",
      price: 4,
      cost: 2,
    },
  ]);

  const updatePrice = (id: string, newPrice: string) => {
    const price = parseFloat(newPrice) || 0;
    setMenuItems(
      menuItems.map((item) => (item.id === id ? { ...item, price } : item))
    );
  };

  const calculateProfit = (item: MenuItem) => {
    return item.price - item.cost;
  };

  const calculateMargin = (item: MenuItem) => {
    if (item.price === 0) return 0;
    return (((item.price - item.cost) / item.price) * 100).toFixed(1);
  };

  const handleSave = () => {
    Alert.alert("Success", "Pricing updated successfully!");
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
        <Text style={styles.title}>Set Pricing</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle"
            size={24}
            color={theme.colors.accent}
          />
          <Text style={styles.infoText}>
            Set competitive prices for your meals. Higher margins mean better
            profits!
          </Text>
        </View>

        {["Breakfast", "Lunch", "Snacks", "Dinner"].map((category) => {
          const categoryItems = menuItems.filter(
            (m) => m.category === category
          );
          if (categoryItems.length === 0) return null;

          return (
            <View key={category} style={styles.section}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {categoryItems.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.profitBadge}>
                      <Ionicons
                        name={
                          calculateProfit(item) > 0
                            ? "trending-up"
                            : "trending-down"
                        }
                        size={16}
                        color={
                          calculateProfit(item) > 0
                            ? theme.colors.success
                            : theme.colors.error
                        }
                      />
                      <Text
                        style={[
                          styles.profitText,
                          {
                            color:
                              calculateProfit(item) > 0
                                ? theme.colors.success
                                : theme.colors.error,
                          },
                        ]}
                      >
                        {calculateMargin(item)}% margin
                      </Text>
                    </View>
                  </View>

                  <View style={styles.pricingRow}>
                    <View style={styles.priceInfo}>
                      <Text style={styles.priceLabel}>Cost</Text>
                      <Text style={styles.costValue}>{item.cost} tokens</Text>
                    </View>

                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color={theme.colors.textSecondary}
                    />

                    <View style={styles.priceInput}>
                      <Text style={styles.priceLabel}>Selling Price</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          value={item.price.toString()}
                          onChangeText={(value) => updatePrice(item.id, value)}
                          keyboardType="numeric"
                        />
                        <Text style={styles.tokenSuffix}>tokens</Text>
                      </View>
                    </View>

                    <View style={styles.priceInfo}>
                      <Text style={styles.priceLabel}>Profit</Text>
                      <Text
                        style={[
                          styles.profitValue,
                          {
                            color:
                              calculateProfit(item) > 0
                                ? theme.colors.success
                                : theme.colors.error,
                          },
                        ]}
                      >
                        +{calculateProfit(item).toFixed(1)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          );
        })}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Pricing Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Menu Items</Text>
            <Text style={styles.summaryValue}>{menuItems.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Avg. Selling Price</Text>
            <Text style={styles.summaryValue}>
              {(
                menuItems.reduce((sum, item) => sum + item.price, 0) /
                menuItems.length
              ).toFixed(1)}{" "}
              tokens
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Avg. Profit/Item</Text>
            <Text
              style={[styles.summaryValue, { color: theme.colors.success }]}
            >
              +
              {(
                menuItems.reduce(
                  (sum, item) => sum + calculateProfit(item),
                  0
                ) / menuItems.length
              ).toFixed(1)}{" "}
              tokens
            </Text>
          </View>
        </View>
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
  saveButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  saveButtonText: {
    ...theme.typography.body,
    color: theme.colors.surface,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.accent + "10",
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
  itemCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  itemName: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    fontWeight: "600",
  },
  profitBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  profitText: {
    ...theme.typography.caption,
    fontWeight: "600",
  },
  pricingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  priceInfo: {
    flex: 1,
    alignItems: "center",
  },
  priceLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  costValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: "600",
  },
  priceInput: {
    flex: 1.5,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  input: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: theme.spacing.xs,
    minWidth: 50,
  },
  tokenSuffix: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  profitValue: {
    ...theme.typography.body,
    fontWeight: "600",
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  summaryTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  summaryLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: "600",
  },
});
