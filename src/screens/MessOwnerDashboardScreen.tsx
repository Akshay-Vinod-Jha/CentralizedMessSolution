import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const MessOwnerDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { orders, refreshOrders, getActiveOrders } = useOrders();
  const [refreshing, setRefreshing] = React.useState(false);

  const activeOrders = getActiveOrders();
  const todayOrders = orders.filter(
    (order) =>
      new Date(order.createdAt).toDateString() === new Date().toDateString()
  );

  const totalTokensToday = todayOrders.reduce(
    (sum, order) => sum + order.totalTokens,
    0
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshOrders();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigation.replace("RoleSelection");
  };

  const stats = [
    {
      icon: "receipt",
      label: "Today Orders",
      value: todayOrders.length.toString(),
      color: theme.colors.primary,
    },
    {
      icon: "wallet",
      label: "Tokens Earned",
      value: totalTokensToday.toString(),
      color: theme.colors.accent,
    },
    {
      icon: "hourglass",
      label: "Active Orders",
      value: activeOrders.length.toString(),
      color: theme.colors.warning,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Mess Owner</Text>
          <Text style={styles.userName}>{user?.name || "Owner"}</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View
              key={index}
              style={[styles.statCard, { backgroundColor: stat.color + "15" }]}
            >
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: stat.color + "30" },
                ]}
              >
                <Ionicons
                  name={stat.icon as any}
                  size={24}
                  color={stat.color}
                />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("MenuManagement")}
          >
            <View
              style={[
                styles.actionIcon,
                { backgroundColor: theme.colors.primary + "20" },
              ]}
            >
              <Ionicons
                name="restaurant"
                size={24}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Manage Menu</Text>
              <Text style={styles.actionSubtitle}>
                Update menu items and prices
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Active Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Orders</Text>
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>#{order.id.slice(-8)}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: theme.colors.warning + "20" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: theme.colors.warning },
                      ]}
                    >
                      {order.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <Text key={index} style={styles.orderItem}>
                      • {item.name} x{item.quantity}
                    </Text>
                  ))}
                </View>

                <View style={styles.orderFooter}>
                  <Text style={styles.orderType}>
                    {order.orderType === "packed" ? "📦 Packed" : "🍽️ Dine-in"}
                  </Text>
                  <Text style={styles.orderTokens}>
                    {order.totalTokens} tokens
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="checkmark-circle-outline"
                size={64}
                color={theme.colors.textLight}
              />
              <Text style={styles.emptyText}>No active orders</Text>
            </View>
          )}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  greeting: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  userName: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  logoutButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: "center",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  actionSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  orderCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  orderId: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    ...theme.typography.caption,
    fontWeight: "600",
  },
  orderItems: {
    marginBottom: theme.spacing.sm,
  },
  orderItem: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  orderType: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  orderTokens: {
    ...theme.typography.subtitle,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
});
