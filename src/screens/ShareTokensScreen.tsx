import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { useWallet } from "../context/WalletContext";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const ShareTokensScreen: React.FC<Props> = ({ navigation }) => {
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const { wallet, transferTokens } = useWallet();

  const handleShare = async () => {
    if (!recipientName.trim()) {
      Alert.alert("Error", "Please enter recipient name");
      return;
    }

    const tokenAmount = parseInt(amount);
    if (isNaN(tokenAmount) || tokenAmount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    if (!wallet || wallet.balance < tokenAmount) {
      Alert.alert(
        "Insufficient Balance",
        `You only have ${wallet?.balance || 0} tokens available`
      );
      return;
    }

    Alert.alert(
      "Confirm Transfer",
      `Send ${tokenAmount} tokens to ${recipientName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            const success = await transferTokens(
              "recipient-id",
              recipientName.trim(),
              tokenAmount
            );

            if (success) {
              Alert.alert(
                "Success",
                `${tokenAmount} tokens sent to ${recipientName}`,
                [
                  {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                  },
                ]
              );
            } else {
              Alert.alert("Error", "Failed to transfer tokens");
            }
          },
        },
      ]
    );
  };

  const quickAmounts = [5, 10, 20, 50];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Share Tokens</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceValue}>{wallet?.balance || 0} tokens</Text>
        </View>

        {/* Transfer Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Transfer Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Recipient Name</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter friend's name"
                value={recipientName}
                onChangeText={setRecipientName}
                placeholderTextColor={theme.colors.textLight}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Amount (Tokens)</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="wallet-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholderTextColor={theme.colors.textLight}
              />
            </View>
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmountsSection}>
            <Text style={styles.quickAmountsLabel}>Quick Select</Text>
            <View style={styles.quickAmountsGrid}>
              {quickAmounts.map((quickAmount) => (
                <TouchableOpacity
                  key={quickAmount}
                  style={[
                    styles.quickAmountButton,
                    amount === quickAmount.toString() &&
                      styles.quickAmountButtonActive,
                  ]}
                  onPress={() => setAmount(quickAmount.toString())}
                >
                  <Text
                    style={[
                      styles.quickAmountText,
                      amount === quickAmount.toString() &&
                        styles.quickAmountTextActive,
                    ]}
                  >
                    {quickAmount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle"
            size={24}
            color={theme.colors.info}
          />
          <Text style={styles.infoText}>
            Tokens can be shared with friends who might need extra meals or
            can't use their purchased tokens. This helps reduce food wastage.
          </Text>
        </View>
      </ScrollView>

      {/* Send Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!recipientName.trim() || !amount || parseInt(amount) <= 0) &&
              styles.sendButtonDisabled,
          ]}
          onPress={handleShare}
          disabled={!recipientName.trim() || !amount || parseInt(amount) <= 0}
          activeOpacity={0.8}
        >
          <Ionicons name="paper-plane" size={20} color={theme.colors.surface} />
          <Text style={styles.sendButtonText}>Send Tokens</Text>
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
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: theme.colors.primaryLight,
    margin: theme.spacing.lg,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
  },
  balanceLabel: {
    ...theme.typography.body,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  balanceValue: {
    ...theme.typography.h1,
    color: theme.colors.primary,
  },
  formSection: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  quickAmountsSection: {
    marginTop: theme.spacing.md,
  },
  quickAmountsLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  quickAmountsGrid: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  quickAmountButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quickAmountButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  quickAmountText: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
  },
  quickAmountTextActive: {
    color: theme.colors.surface,
    fontWeight: "600",
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.info + "10",
    margin: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.md,
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.large,
  },
  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.textLight,
  },
  sendButtonText: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
    fontWeight: "600",
  },
});
