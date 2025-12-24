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
import { useWallet } from "../context/WalletContext";
import { useOrders } from "../context/OrderContext";
import { TokenBalanceCard } from "../components";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

interface QuickAction {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  color: string;
  screen: string;
}

const quickActions: QuickAction[] = [
  {
    id: "1",
    icon: "search-outline",
    title: "Discover Messes",
    subtitle: "Find best food options",
    color: theme.colors.primary,
    screen: "MessDiscovery",
  },
  {
    id: "2",
    icon: "restaurant-outline",
    title: "Order Food",
    subtitle: "Quick meal ordering",
    color: theme.colors.secondary,
    screen: "MessDiscovery",
  },
  {
    id: "3",
    icon: "share-social-outline",
    title: "Share Tokens",
    subtitle: "Send to friends",
    color: theme.colors.accent,
    screen: "ShareTokens",
  },
  {
    id: "4",
    icon: "bicycle-outline",
    title: "Delivery",
    subtitle: "Request delivery",
    color: theme.colors.warning,
    screen: "DeliveryRequest",
  },
];

export const StudentDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { wallet, refreshWallet, isLoading: walletLoading } = useWallet();
  const { orders, refreshOrders, getActiveOrders } = useOrders();
  const [refreshing, setRefreshing] = React.useState(false);

  const activeOrders = getActiveOrders();

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refreshWallet(), refreshOrders()]);
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigation.replace("RoleSelection");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{user?.name || "Student"}</Text>
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
        {/* Wallet Balance */}
        <View style={styles.section}>
          <TokenBalanceCard
            balance={wallet?.balance || 0}
            onPress={() => navigation.navigate("TokenWallet")}
          />
        </View>

        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Orders</Text>
            {activeOrders.slice(0, 2).map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() =>
                  navigation.navigate("OrderDetails", { orderId: order.id })
                }
                activeOpacity={0.7}
              >
                <View style={styles.orderInfo}>
                  <Text style={styles.orderMess}>{order.messName}</Text>
                  <Text style={styles.orderStatus}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Text>
                </View>
                <View style={styles.orderMeta}>
                  <Text style={styles.orderTokens}>
                    {order.totalTokens} tokens
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.actionCard,
                  { backgroundColor: action.color + "15" },
                ]}
                onPress={() => navigation.navigate(action.screen)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.actionIcon,
                    { backgroundColor: action.color + "30" },
                  ]}
                >
                  <Ionicons name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("TokenWallet")}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {wallet && wallet.transactions.length > 0 ? (
            wallet.transactions.slice(0, 3).map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Ionicons
                    name={
                      transaction.type === "credit" ||
                      transaction.type === "transfer-received"
                        ? "arrow-down"
                        : "arrow-up"
                    }
                    size={16}
                    color={
                      transaction.type === "credit" ||
                      transaction.type === "transfer-received"
                        ? theme.colors.success
                        : theme.colors.error
                    }
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDesc}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    {
                      color:
                        transaction.type === "credit" ||
                        transaction.type === "transfer-received"
                          ? theme.colors.success
                          : theme.colors.error,
                    },
                  ]}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No transactions yet</Text>
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
  section: {
    padding: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  seeAll: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  actionCard: {
    width: "47%",
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: "center",
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
  },
  actionTitle: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
  actionSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  orderInfo: {
    flex: 1,
  },
  orderMess: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  orderStatus: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  orderMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  orderTokens: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDesc: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: 2,
  },
  transactionDate: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  transactionAmount: {
    ...theme.typography.subtitle,
    fontWeight: "600",
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
    paddingVertical: theme.spacing.lg,
  },
});
