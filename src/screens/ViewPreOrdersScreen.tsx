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
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { defaultUserData } from "../utils/mockData";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const ViewPreOrdersScreen: React.FC<Props> = ({ navigation }) => {
  const [preOrders, setPreOrders] = useState(
    defaultUserData.provider.samplePreOrders
  );

  const handleConfirmOrder = (orderId: string) => {
    setPreOrders(
      preOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: "confirmed" as const }
          : order
      )
    );
    Alert.alert("Success", "Order confirmed!");
  };

  const handleRejectOrder = (orderId: string) => {
    Alert.alert("Reject Order", "Are you sure you want to reject this order?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reject",
        style: "destructive",
        onPress: () => {
          setPreOrders(preOrders.filter((order) => order.id !== orderId));
          Alert.alert("Order Rejected", "The order has been rejected.");
        },
      },
    ]);
  };

  const pendingOrders = preOrders.filter((o) => o.status === "pending");
  const confirmedOrders = preOrders.filter((o) => o.status === "confirmed");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Pre-Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{pendingOrders.length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{confirmedOrders.length}</Text>
            <Text style={styles.statLabel}>Confirmed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{preOrders.length}</Text>
            <Text style={styles.statLabel}>Total Today</Text>
          </View>
        </View>

        {/* Pending Orders */}
        {pendingOrders.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⏳ Pending Orders</Text>
            {pendingOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.studentInfo}>
                    <Ionicons
                      name="person-circle"
                      size={48}
                      color={theme.colors.primary}
                    />
                    <View style={styles.studentDetails}>
                      <Text style={styles.studentName}>
                        {order.studentName}
                      </Text>
                      <Text style={styles.deliveryTime}>
                        <Ionicons
                          name="time"
                          size={14}
                          color={theme.colors.textSecondary}
                        />{" "}
                        {order.deliveryTime}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.orderDetails}>
                  <View style={styles.mealInfo}>
                    <Text style={styles.mealName}>{order.meal}</Text>
                    <Text style={styles.mealQuantity}>
                      Quantity: {order.quantity}
                    </Text>
                  </View>
                  <Text style={styles.orderTokens}>{order.tokens} tokens</Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.rejectBtn]}
                    onPress={() => handleRejectOrder(order.id)}
                  >
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color={theme.colors.error}
                    />
                    <Text
                      style={[
                        styles.actionBtnText,
                        { color: theme.colors.error },
                      ]}
                    >
                      Reject
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.confirmBtn]}
                    onPress={() => handleConfirmOrder(order.id)}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={theme.colors.success}
                    />
                    <Text
                      style={[
                        styles.actionBtnText,
                        { color: theme.colors.success },
                      ]}
                    >
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Confirmed Orders */}
        {confirmedOrders.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✅ Confirmed Orders</Text>
            {confirmedOrders.map((order) => (
              <View
                key={order.id}
                style={[styles.orderCard, styles.confirmedCard]}
              >
                <View style={styles.orderHeader}>
                  <View style={styles.studentInfo}>
                    <Ionicons
                      name="person-circle"
                      size={48}
                      color={theme.colors.success}
                    />
                    <View style={styles.studentDetails}>
                      <Text style={styles.studentName}>
                        {order.studentName}
                      </Text>
                      <Text style={styles.deliveryTime}>
                        <Ionicons
                          name="time"
                          size={14}
                          color={theme.colors.textSecondary}
                        />{" "}
                        {order.deliveryTime}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.confirmedBadge}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={theme.colors.success}
                    />
                  </View>
                </View>

                <View style={styles.orderDetails}>
                  <View style={styles.mealInfo}>
                    <Text style={styles.mealName}>{order.meal}</Text>
                    <Text style={styles.mealQuantity}>
                      Quantity: {order.quantity}
                    </Text>
                  </View>
                  <Text style={styles.orderTokens}>{order.tokens} tokens</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {preOrders.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons
              name="receipt-outline"
              size={64}
              color={theme.colors.textLight}
            />
            <Text style={styles.emptyText}>No pre-orders yet</Text>
            <Text style={styles.emptySubtext}>
              Orders will appear here when students place them
            </Text>
          </View>
        )}
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
  statsRow: {
    flexDirection: "row",
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: "center",
    ...theme.shadows.small,
  },
  statValue: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
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
  orderCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  confirmedCard: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.success,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  studentInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  studentDetails: {
    marginLeft: theme.spacing.sm,
  },
  studentName: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    fontWeight: "600",
  },
  deliveryTime: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  confirmedBadge: {
    padding: theme.spacing.xs,
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: theme.spacing.md,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: "600",
  },
  mealQuantity: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  orderTokens: {
    ...theme.typography.h3,
    color: theme.colors.accent,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
  },
  rejectBtn: {
    backgroundColor: theme.colors.error + "10",
  },
  confirmBtn: {
    backgroundColor: theme.colors.success + "10",
  },
  actionBtnText: {
    ...theme.typography.body,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
    marginTop: theme.spacing.xxl,
  },
  emptyText: {
    ...theme.typography.subtitle,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  emptySubtext: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginTop: theme.spacing.xs,
  },
});
