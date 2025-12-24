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
import { useWallet } from "../context/WalletContext";
import { TokenBalanceCard } from "../components";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const TokenWalletScreen: React.FC<Props> = ({ navigation }) => {
  const { wallet, refreshWallet } = useWallet();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshWallet();
    setRefreshing(false);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "credit":
      case "transfer-received":
        return "arrow-down-circle";
      case "debit":
      case "transfer-sent":
        return "arrow-up-circle";
      default:
        return "swap-horizontal";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "credit":
      case "transfer-received":
        return theme.colors.success;
      case "debit":
      case "transfer-sent":
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
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
        <Text style={styles.title}>Token Wallet</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShareTokens")}
          style={styles.shareButton}
        >
          <Ionicons
            name="share-social"
            size={24}
            color={theme.colors.primary}
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
        {/* Balance Card */}
        <View style={styles.balanceSection}>
          <TokenBalanceCard balance={wallet?.balance || 0} />

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("ShareTokens")}
            >
              <Ionicons
                name="paper-plane"
                size={20}
                color={theme.colors.primary}
              />
              <Text style={styles.actionButtonText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
              <Ionicons
                name="add-circle"
                size={20}
                color={theme.colors.accent}
              />
              <Text style={styles.actionButtonText}>Add Tokens</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Transaction History</Text>

          {wallet && wallet.transactions.length > 0 ? (
            wallet.transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View
                  style={[
                    styles.transactionIcon,
                    {
                      backgroundColor:
                        getTransactionColor(transaction.type) + "20",
                    },
                  ]}
                >
                  <Ionicons
                    name={getTransactionIcon(transaction.type)}
                    size={24}
                    color={getTransactionColor(transaction.type)}
                  />
                </View>

                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.timestamp).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </Text>
                  {transaction.relatedUserName && (
                    <Text style={styles.transactionRelated}>
                      {transaction.type === "transfer-sent" ? "To: " : "From: "}
                      {transaction.relatedUserName}
                    </Text>
                  )}
                </View>

                <Text
                  style={[
                    styles.transactionAmount,
                    { color: getTransactionColor(transaction.type) },
                  ]}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="receipt-outline"
                size={64}
                color={theme.colors.textLight}
              />
              <Text style={styles.emptyText}>No transactions yet</Text>
              <Text style={styles.emptySubtext}>
                Your transaction history will appear here
              </Text>
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
  shareButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  balanceSection: {
    padding: theme.spacing.lg,
  },
  actionsRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
    ...theme.shadows.small,
  },
  actionButtonText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: "600",
  },
  transactionsSection: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: 4,
  },
  transactionDate: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  transactionRelated: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginTop: 2,
  },
  transactionAmount: {
    ...theme.typography.h3,
    fontWeight: "700",
    marginLeft: theme.spacing.sm,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    ...theme.typography.h3,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  emptySubtext: {
    ...theme.typography.body,
    color: theme.colors.textLight,
    marginTop: theme.spacing.xs,
  },
});
