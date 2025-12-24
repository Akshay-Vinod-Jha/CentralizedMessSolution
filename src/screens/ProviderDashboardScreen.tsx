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
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { useAuth } from "../context/AuthContext";
import { defaultUserData } from "../utils/mockData";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const ProviderDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [preOrders] = useState(defaultUserData.provider.samplePreOrders);
  const [recentOrders] = useState(defaultUserData.provider.recentOrders);
  const providerStats = defaultUserData.provider.stats;

  const handleLogout = async () => {
    await logout();
    navigation.replace("RoleSelection");
  };

  const handleFeatureClick = (featureTitle: string) => {
    const navigationMap: { [key: string]: string } = {
      "Manage Availability": "ManageAvailability",
      "View Pre-orders": "ViewPreOrders",
      "Set Pricing": "SetPricing",
      "Delivery Schedule": "DeliverySchedule",
    };

    const screenName = navigationMap[featureTitle];
    if (screenName) {
      navigation.navigate(screenName);
    }
  };

  const stats = [
    {
      icon: "cube",
      label: "Available Meals",
      value: providerStats.availableMeals.toString(),
      color: theme.colors.primary,
    },
    {
      icon: "receipt",
      label: "Pre-orders",
      value: providerStats.preOrders.toString(),
      color: theme.colors.warning,
    },
    {
      icon: "wallet",
      label: "Tokens Earned",
      value: providerStats.tokensEarned.toString(),
      color: theme.colors.accent,
    },
  ];

  const features = [
    {
      icon: "restaurant",
      title: "Manage Availability",
      description: "Set your daily food availability",
      color: theme.colors.primary,
    },
    {
      icon: "list",
      title: "View Pre-orders",
      description: "Check incoming orders",
      color: theme.colors.secondary,
    },
    {
      icon: "pricetag",
      title: "Set Pricing",
      description: "Update your meal prices",
      color: theme.colors.accent,
    },
    {
      icon: "time",
      title: "Delivery Schedule",
      description: "Manage delivery timings",
      color: theme.colors.warning,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Food Provider</Text>
          <Text style={styles.userName}>{user?.name || "Provider"}</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage Your Service</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.featureCard,
                  { backgroundColor: feature.color + "15" },
                ]}
                activeOpacity={0.7}
                onPress={() => handleFeatureClick(feature.title)}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: feature.color + "30" },
                  ]}
                >
                  <Ionicons
                    name={feature.icon as any}
                    size={28}
                    color={feature.color}
                  />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pre-Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Pre-Orders</Text>
          {preOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.studentInfo}>
                  <Ionicons
                    name="person-circle"
                    size={40}
                    color={theme.colors.primary}
                  />
                  <View style={styles.studentDetails}>
                    <Text style={styles.studentName}>{order.studentName}</Text>
                    <Text style={styles.deliveryTime}>
                      Delivery: {order.deliveryTime}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        order.status === "confirmed"
                          ? theme.colors.success + "20"
                          : theme.colors.warning + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          order.status === "confirmed"
                            ? theme.colors.success
                            : theme.colors.warning,
                      },
                    ]}
                  >
                    {order.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetails}>
                <Text style={styles.mealName}>
                  • {order.meal} x{order.quantity}
                </Text>
                <Text style={styles.orderTokens}>{order.tokens} tokens</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Completed Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Completed Orders</Text>
          {recentOrders.map((order) => (
            <View key={order.id} style={styles.completedOrderCard}>
              <View style={styles.completedOrderHeader}>
                <Text style={styles.studentName}>{order.studentName}</Text>
                <Text style={styles.deliveryDate}>{order.deliveredAt}</Text>
              </View>
              <View style={styles.completedOrderDetails}>
                <Text style={styles.mealName}>{order.meal}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons
                    name="star"
                    size={16}
                    color={theme.colors.warning}
                  />
                  <Text style={styles.ratingText}>{order.rating}/5</Text>
                  <Text style={styles.orderTokens}>
                    {" "}
                    • {order.tokens} tokens
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="bulb" size={32} color={theme.colors.warning} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Grow Your Tiffin Business</Text>
            <Text style={styles.infoText}>
              List extra meals daily and accept pre-orders from students. Use
              the token system for flexible payments.
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
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  featureCard: {
    width: "47%",
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: "center",
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
  },
  featureTitle: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.warning + "10",
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 20,
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
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    ...theme.typography.caption,
    fontWeight: "600",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  mealName: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  orderTokens: {
    ...theme.typography.subtitle,
    color: theme.colors.accent,
    fontWeight: "600",
  },
  completedOrderCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  completedOrderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xs,
  },
  deliveryDate: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  completedOrderDetails: {
    marginTop: theme.spacing.xs,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.xs,
  },
  ratingText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
});
