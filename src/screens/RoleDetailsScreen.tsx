import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../utils/theme";
import { useAuth } from "../context/AuthContext";
import { UserRole, User } from "../types";
import { saveWallet, saveOrders } from "../utils/storage";
import {
  createDefaultWallet,
  defaultUserData,
  createSampleOrders,
} from "../utils/mockData";

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: { role: UserRole } }, "params">;
};

interface RoleConfig {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  gradient: [string, string];
  benefits: {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
  }[];
}

const roleConfigs: Record<UserRole, RoleConfig> = {
  student: {
    title: "Student",
    icon: "school",
    color: theme.colors.primary,
    gradient: [theme.colors.primary, "#6366f1"],
    benefits: [
      {
        icon: "wallet",
        text: `${defaultUserData.student.welcomeBonus} tokens welcome bonus`,
      },
      { icon: "restaurant", text: "Access to all campus messes" },
      { icon: "gift", text: "Share tokens with friends" },
      { icon: "notifications", text: "Real-time order updates" },
    ],
  },
  "mess-owner": {
    title: "Mess Owner",
    icon: "restaurant",
    color: theme.colors.secondary,
    gradient: [theme.colors.secondary, "#059669"],
    benefits: [
      {
        icon: "receipt",
        text: `${defaultUserData["mess-owner"].stats.activeOrders} active demo orders to start`,
      },
      { icon: "stats-chart", text: "Real-time order management dashboard" },
      { icon: "create", text: "Easy menu creation & editing" },
      { icon: "cash", text: "Track revenue and earnings" },
    ],
  },
  provider: {
    title: "Food Provider",
    icon: "storefront",
    color: theme.colors.accent,
    gradient: [theme.colors.accent, "#f59e0b"],
    benefits: [
      { icon: "bicycle", text: "Receive delivery requests from students" },
      { icon: "time", text: "Flexible delivery schedule" },
      { icon: "star", text: "Build your rating and earn more" },
      { icon: "trending-up", text: "Track your performance" },
    ],
  },
};

export const RoleDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { role } = route.params;
  const config = roleConfigs[role];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Create user object
      const user: User = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role: role,
      };

      // Initialize wallet with default data based on role
      const wallet = createDefaultWallet(user.id, role);
      await saveWallet(wallet);

      // Create sample orders for mess owners
      if (role === "mess-owner") {
        const messId = `mess-${user.id}`;
        const sampleOrders = createSampleOrders(user.id, messId);
        await saveOrders(sampleOrders);
      }

      // Login user
      await login(user);

      // Navigate to appropriate dashboard
      navigateToDashboard(role);
    } catch (error) {
      console.error("Error during role selection:", error);
      Alert.alert("Error", "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToDashboard = (role: UserRole) => {
    switch (role) {
      case "student":
        navigation.replace("StudentDashboard");
        break;
      case "mess-owner":
        navigation.replace("MessOwnerDashboard");
        break;
      case "provider":
        navigation.replace("ProviderDashboard");
        break;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient */}
        <LinearGradient colors={config.gradient} style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <View style={styles.iconContainer}>
              <Ionicons name={config.icon} size={64} color="#fff" />
            </View>
            <Text style={styles.headerTitle}>{config.title}</Text>
            <Text style={styles.headerSubtitle}>
              Let's get you started on your journey
            </Text>
          </View>
        </LinearGradient>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Your Details</Text>

          <View style={styles.inputWrapper}>
            <View style={styles.inputLabel}>
              <Ionicons
                name="person"
                size={18}
                color={config.color}
                style={styles.labelIcon}
              />
              <Text style={styles.labelText}>Full Name</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={theme.colors.textLight}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputWrapper}>
            <View style={styles.inputLabel}>
              <Ionicons
                name="mail"
                size={18}
                color={config.color}
                style={styles.labelIcon}
              />
              <Text style={styles.labelText}>Email Address</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={theme.colors.textLight}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              { backgroundColor: config.color },
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.continueButtonText}>Creating Account...</Text>
            ) : (
              <>
                <Text style={styles.continueButtonText}>Get Started</Text>
                <Ionicons name="arrow-forward" size={22} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>✨ What You'll Get</Text>

          <View style={styles.benefitsList}>
            {config.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View
                  style={[
                    styles.benefitIcon,
                    { backgroundColor: config.color + "20" },
                  ]}
                >
                  <Ionicons
                    name={benefit.icon}
                    size={22}
                    color={config.color}
                  />
                </View>
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.lg,
  },
  headerContent: {
    alignItems: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
  benefitsSection: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  benefitsList: {
    gap: theme.spacing.md,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  benefitIcon: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 20,
  },
  formSection: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  inputWrapper: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  labelIcon: {
    marginRight: theme.spacing.xs,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    ...theme.shadows.small,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md + 4,
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  footer: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 16,
  },
});
