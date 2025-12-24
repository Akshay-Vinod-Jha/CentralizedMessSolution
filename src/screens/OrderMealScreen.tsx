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
import { MenuItem, OrderItem, Order } from "../types";
import { getMenuItemsByMessId } from "../utils/storage";
import { useWallet } from "../context/WalletContext";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import { MenuItemCard, OrderSummary } from "../components";

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: { messId: string; messName: string } }, "params">;
};

export const OrderMealScreen: React.FC<Props> = ({ navigation, route }) => {
  const { messId, messName } = route.params;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(
    new Map()
  );
  const [orderType, setOrderType] = useState<"normal" | "packed">("normal");
  const { wallet, deductTokens } = useWallet();
  const { placeOrder } = useOrders();
  const { user } = useAuth();

  useEffect(() => {
    loadMenuItems();
  }, [messId]);

  const loadMenuItems = async () => {
    const items = await getMenuItemsByMessId(messId);
    setMenuItems(items.filter((item) => item.available));
  };

  const handleAddItem = (itemId: string) => {
    const newMap = new Map(selectedItems);
    const currentQty = newMap.get(itemId) || 0;
    newMap.set(itemId, currentQty + 1);
    setSelectedItems(newMap);
  };

  const handleRemoveItem = (itemId: string) => {
    const newMap = new Map(selectedItems);
    const currentQty = newMap.get(itemId) || 0;

    if (currentQty > 1) {
      newMap.set(itemId, currentQty - 1);
    } else {
      newMap.delete(itemId);
    }
    setSelectedItems(newMap);
  };

  const calculateTotal = (): number => {
    let total = 0;
    selectedItems.forEach((quantity, itemId) => {
      const item = menuItems.find((m) => m.id === itemId);
      if (item) {
        total += item.price * quantity;
      }
    });
    return total;
  };

  const getOrderItems = (): OrderItem[] => {
    const items: OrderItem[] = [];
    selectedItems.forEach((quantity, itemId) => {
      const menuItem = menuItems.find((m) => m.id === itemId);
      if (menuItem) {
        items.push({
          menuItemId: menuItem.id,
          name: menuItem.name,
          quantity,
          tokensPerItem: menuItem.price,
        });
      }
    });
    return items;
  };

  const handlePlaceOrder = async () => {
    if (selectedItems.size === 0) {
      Alert.alert("No Items", "Please select at least one item to order");
      return;
    }

    if (!user) {
      Alert.alert("Error", "Please login to place order");
      return;
    }

    const totalTokens = calculateTotal();

    if (!wallet || wallet.balance < totalTokens) {
      Alert.alert(
        "Insufficient Balance",
        `You need ${totalTokens} tokens but only have ${
          wallet?.balance || 0
        } tokens. Please add more tokens to your wallet.`
      );
      return;
    }

    Alert.alert(
      "Confirm Order",
      `Total: ${totalTokens} tokens\nOrder Type: ${
        orderType === "normal" ? "Dine-in" : "Packed"
      }\n\nProceed with order?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const order: Order = {
                id: `order-${Date.now()}`,
                userId: user.id,
                messId,
                messName,
                items: getOrderItems(),
                totalTokens,
                status: "pending",
                orderType,
                deliveryRequested: false,
                createdAt: new Date().toISOString(),
              };

              // Deduct tokens
              const success = await deductTokens(
                totalTokens,
                `Order from ${messName}`,
                order.id
              );

              if (success) {
                await placeOrder(order);
                Alert.alert("Success", "Your order has been placed!", [
                  {
                    text: "OK",
                    onPress: () => navigation.navigate("StudentDashboard"),
                  },
                ]);
              } else {
                Alert.alert("Error", "Failed to process payment");
              }
            } catch (error) {
              console.error("Error placing order:", error);
              Alert.alert("Error", "Failed to place order");
            }
          },
        },
      ]
    );
  };

  const totalTokens = calculateTotal();
  const orderItems = getOrderItems();

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
          Order from {messName}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Type Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Type</Text>
          <View style={styles.orderTypeContainer}>
            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                orderType === "normal" && styles.orderTypeButtonActive,
              ]}
              onPress={() => setOrderType("normal")}
            >
              <Ionicons
                name="restaurant"
                size={24}
                color={
                  orderType === "normal"
                    ? theme.colors.surface
                    : theme.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.orderTypeText,
                  orderType === "normal" && styles.orderTypeTextActive,
                ]}
              >
                Dine-in
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                orderType === "packed" && styles.orderTypeButtonActive,
              ]}
              onPress={() => setOrderType("packed")}
            >
              <Ionicons
                name="bag"
                size={24}
                color={
                  orderType === "packed"
                    ? theme.colors.surface
                    : theme.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.orderTypeText,
                  orderType === "packed" && styles.orderTypeTextActive,
                ]}
              >
                Packed
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Items</Text>
          {menuItems.map((item) => {
            const quantity = selectedItems.get(item.id) || 0;
            return (
              <View key={item.id} style={styles.itemContainer}>
                <MenuItemCard item={item} showAddButton={false} />

                {quantity > 0 ? (
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleRemoveItem(item.id)}
                    >
                      <Ionicons
                        name="remove"
                        size={20}
                        color={theme.colors.surface}
                      />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{quantity}</Text>

                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleAddItem(item.id)}
                    >
                      <Ionicons
                        name="add"
                        size={20}
                        color={theme.colors.surface}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddItem(item.id)}
                  >
                    <Text style={styles.addButtonText}>Add to Order</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Order Summary */}
        {selectedItems.size > 0 && (
          <View style={styles.section}>
            <OrderSummary items={orderItems} totalTokens={totalTokens} />
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      {selectedItems.size > 0 && (
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerLabel}>Total</Text>
            <Text style={styles.footerValue}>{totalTokens} tokens</Text>
          </View>

          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
            activeOpacity={0.8}
          >
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}
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
    flex: 1,
    marginHorizontal: theme.spacing.md,
    textAlign: "center",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  orderTypeContainer: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  orderTypeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: "transparent",
  },
  orderTypeButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primaryDark,
  },
  orderTypeText: {
    ...theme.typography.subtitle,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  orderTypeTextActive: {
    color: theme.colors.surface,
    fontWeight: "600",
  },
  itemContainer: {
    marginBottom: theme.spacing.md,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    ...theme.typography.h3,
    color: theme.colors.text,
    minWidth: 40,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  addButtonText: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.large,
    gap: theme.spacing.md,
  },
  footerInfo: {
    flex: 1,
  },
  footerLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  footerValue: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  placeOrderButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
  },
  placeOrderButtonText: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
    fontWeight: "600",
  },
});
