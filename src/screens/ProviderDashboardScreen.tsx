import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { useAuth } from "../context/AuthContext";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const ProviderDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace("RoleSelection");
  };

  const stats = [
    {
      icon: "cube",
      label: "Available Meals",
      value: "12",
      color: theme.colors.primary,
    },
    {
      icon: "receipt",
      label: "Pre-orders",
      value: "5",
      color: theme.colors.warning,
    },
    {
      icon: "wallet",
      label: "Tokens Earned",
      value: "85",
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
            <View key={index} style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: stat.color + "20" },
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
                style={styles.featureCard}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: feature.color + "20" },
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

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <View style={styles.emptyState}>
            <Ionicons
              name="restaurant-outline"
              size={64}
              color={theme.colors.textLight}
            />
            <Text style={styles.emptyText}>No recent orders</Text>
            <Text style={styles.emptySubtext}>
              Orders will appear here when students place them
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
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: "center",
    ...theme.shadows.small,
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
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: "center",
    ...theme.shadows.small,
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
  emptyState: {
    alignItems: "center",
    paddingVertical: theme.spacing.xxl,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
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
    textAlign: "center",
  },
});
