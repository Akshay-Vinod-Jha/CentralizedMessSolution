import React, { useState } from "react";
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
import { MenuItem, MealCustomization } from "../types";

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<
    { params: { menuItem: MenuItem; messId: string; messName: string } },
    "params"
  >;
};

export const MealCustomizationScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { menuItem, messId, messName } = route.params;
  const [portionSize, setPortionSize] = useState<"small" | "regular" | "large">(
    "regular"
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const portionSizes = [
    { id: "small", label: "Small", price: -0.5 },
    { id: "regular", label: "Regular", price: 0 },
    { id: "large", label: "Large", price: 0.5 },
  ];

  const addOns = [
    { id: "extra-roti", label: "Extra Roti", price: 0.5 },
    { id: "extra-rice", label: "Extra Rice", price: 0.5 },
    { id: "salad", label: "Fresh Salad", price: 1 },
    { id: "raita", label: "Raita", price: 0.5 },
    { id: "papad", label: "Papad", price: 0.5 },
  ];

  const toggleAddOn = (addOnId: string) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter((id) => id !== addOnId));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId]);
    }
  };

  const calculateTotalPrice = (): number => {
    let total = menuItem.price;

    // Add portion size adjustment
    const portion = portionSizes.find((p) => p.id === portionSize);
    if (portion) {
      total += portion.price;
    }

    // Add add-ons
    selectedAddOns.forEach((addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn) {
        total += addOn.price;
      }
    });

    return total;
  };

  const handleAddToOrder = () => {
    Alert.alert("Success", "Item customized! Proceeding to order...");
    navigation.navigate("OrderMeal", { messId, messName });
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
        <Text style={styles.title}>Customize Meal</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Item Info */}
        <View style={styles.itemCard}>
          <Text style={styles.itemName}>{menuItem.name}</Text>
          <Text style={styles.itemDescription}>{menuItem.description}</Text>
          <Text style={styles.basePrice}>
            Base Price: {menuItem.price} tokens
          </Text>
        </View>

        {/* Portion Size */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portion Size</Text>
          <View style={styles.optionsContainer}>
            {portionSizes.map((size) => (
              <TouchableOpacity
                key={size.id}
                style={[
                  styles.optionCard,
                  portionSize === size.id && styles.optionCardActive,
                ]}
                onPress={() => setPortionSize(size.id as any)}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    portionSize === size.id && styles.optionLabelActive,
                  ]}
                >
                  {size.label}
                </Text>
                {size.price !== 0 && (
                  <Text
                    style={[
                      styles.optionPrice,
                      portionSize === size.id && styles.optionPriceActive,
                    ]}
                  >
                    {size.price > 0 ? "+" : ""}
                    {size.price} tokens
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add-ons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add-ons</Text>
          <View style={styles.addOnsContainer}>
            {addOns.map((addOn) => {
              const isSelected = selectedAddOns.includes(addOn.id);
              return (
                <TouchableOpacity
                  key={addOn.id}
                  style={[
                    styles.addOnCard,
                    isSelected && styles.addOnCardActive,
                  ]}
                  onPress={() => toggleAddOn(addOn.id)}
                >
                  <View style={styles.addOnInfo}>
                    <View
                      style={[
                        styles.checkbox,
                        isSelected && styles.checkboxActive,
                      ]}
                    >
                      {isSelected && (
                        <Ionicons
                          name="checkmark"
                          size={16}
                          color={theme.colors.surface}
                        />
                      )}
                    </View>
                    <Text style={styles.addOnLabel}>{addOn.label}</Text>
                  </View>
                  <Text style={styles.addOnPrice}>+{addOn.price}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Total</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Base Price</Text>
            <Text style={styles.summaryValue}>{menuItem.price} tokens</Text>
          </View>
          {portionSize !== "regular" && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Portion ({portionSize})</Text>
              <Text style={styles.summaryValue}>
                {portionSizes.find((p) => p.id === portionSize)?.price || 0}{" "}
                tokens
              </Text>
            </View>
          )}
          {selectedAddOns.map((addOnId) => {
            const addOn = addOns.find((a) => a.id === addOnId);
            return addOn ? (
              <View key={addOnId} style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{addOn.label}</Text>
                <Text style={styles.summaryValue}>+{addOn.price} tokens</Text>
              </View>
            ) : null;
          })}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {calculateTotalPrice()} tokens
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToOrder}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Add to Order</Text>
          <Text style={styles.addButtonPrice}>
            {calculateTotalPrice()} tokens
          </Text>
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
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  itemCard: {
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  itemName: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  itemDescription: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  basePrice: {
    ...theme.typography.subtitle,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  optionCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
  },
  optionCardActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  optionLabel: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  optionLabelActive: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  optionPrice: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  optionPriceActive: {
    color: theme.colors.primary,
  },
  addOnsContainer: {
    gap: theme.spacing.sm,
  },
  addOnCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  addOnCardActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  addOnInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  addOnLabel: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  addOnPrice: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: "600",
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  summaryTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.md,
  },
  totalLabel: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  totalValue: {
    ...theme.typography.h3,
    color: theme.colors.primary,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.large,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  addButtonText: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
    fontWeight: "600",
  },
  addButtonPrice: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
    fontWeight: "700",
  },
});
