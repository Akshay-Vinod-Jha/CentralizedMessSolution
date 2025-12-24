import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { useAuth } from "../context/AuthContext";
import { UserRole, User } from "../types";
import { saveWallet } from "../utils/storage";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

interface RoleOption {
  role: UserRole;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}

const roleOptions: RoleOption[] = [
  {
    role: "student",
    icon: "school-outline",
    title: "Student",
    description: "Order meals, manage tokens, discover messes",
    color: theme.colors.primary,
  },
  {
    role: "mess-owner",
    icon: "restaurant-outline",
    title: "Mess Owner",
    description: "Manage menu, track orders, view analytics",
    color: theme.colors.secondary,
  },
  {
    role: "provider",
    icon: "storefront-outline",
    title: "Food Provider",
    description: "Offer tiffin services, manage availability",
    color: theme.colors.accent,
  },
];

export const RoleSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login, setUserRole } = useAuth();

  const handleContinue = async () => {
    if (!selectedRole) {
      Alert.alert("Error", "Please select a role");
      return;
    }

    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      // Create user object
      const user: User = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role: selectedRole,
      };

      // Initialize wallet for students
      if (selectedRole === "student") {
        const wallet = {
          userId: user.id,
          balance: 50,
          transactions: [
            {
              id: `txn-${Date.now()}`,
              userId: user.id,
              type: "credit" as const,
              amount: 50,
              description: "Welcome bonus",
              timestamp: new Date().toISOString(),
            },
          ],
        };
        await saveWallet(wallet);
      }

      // Login user
      await login(user);

      // Navigate to appropriate dashboard
      navigateToDashboard(selectedRole);
    } catch (error) {
      console.error("Error during role selection:", error);
      Alert.alert("Error", "Failed to create account. Please try again.");
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Choose your role to get started</Text>
      </View>

      <View style={styles.rolesContainer}>
        {roleOptions.map((option) => (
          <TouchableOpacity
            key={option.role}
            style={[
              styles.roleCard,
              selectedRole === option.role && {
                borderColor: option.color,
                borderWidth: 2,
                backgroundColor: option.color + "10",
              },
            ]}
            onPress={() => setSelectedRole(option.role)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.roleIcon,
                { backgroundColor: option.color + "20" },
              ]}
            >
              <Ionicons name={option.icon} size={32} color={option.color} />
            </View>

            <View style={styles.roleInfo}>
              <Text style={styles.roleTitle}>{option.title}</Text>
              <Text style={styles.roleDescription}>{option.description}</Text>
            </View>

            {selectedRole === option.role && (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={option.color}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {selectedRole && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Your Details</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color={theme.colors.textSecondary}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={theme.colors.textLight}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={theme.colors.textSecondary}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={theme.colors.textLight}
            />
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color={theme.colors.surface}
            />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xxl,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  rolesContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: "transparent",
    ...theme.shadows.small,
  },
  roleIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  roleDescription: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  formContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.small,
  },
  formTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  continueButtonText: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
    fontWeight: "600",
  },
});
