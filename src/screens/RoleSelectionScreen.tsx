import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { UserRole } from "../types";

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
    icon: "bicycle-outline",
    title: "Food Provider",
    description: "Offer tiffin services, manage availability",
    color: theme.colors.accent,
  },
];

export const RoleSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Navigate to role-specific detail screen after a short delay for visual feedback
    setTimeout(() => {
      navigation.navigate("RoleDetails", { role });
    }, 300);
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
        {roleOptions.map((option) => {
          const isSelected = selectedRole === option.role;
          return (
            <TouchableOpacity
              key={option.role}
              style={[
                styles.roleCard,
                isSelected && [
                  styles.roleCardSelected,
                  { backgroundColor: option.color },
                ],
              ]}
              onPress={() => handleRoleSelect(option.role)}
              activeOpacity={0.85}
              // Disable Android ripple effect
              {...(Platform.OS === "android" && {
                android_ripple: null,
                background: undefined,
              })}
            >
              <View
                style={[
                  styles.roleIcon,
                  isSelected
                    ? styles.roleIconSelected
                    : { backgroundColor: option.color + "15" },
                ]}
              >
                <Ionicons
                  name={option.icon}
                  size={36}
                  color={isSelected ? theme.colors.surface : option.color}
                />
              </View>

              <View style={styles.roleInfo}>
                <Text
                  style={[
                    styles.roleTitle,
                    isSelected && styles.roleTitleSelected,
                  ]}
                >
                  {option.title}
                </Text>
                <Text
                  style={[
                    styles.roleDescription,
                    isSelected && styles.roleDescriptionSelected,
                  ]}
                >
                  {option.description}
                </Text>
              </View>

              <Ionicons
                name={isSelected ? "checkmark-circle" : "chevron-forward"}
                size={24}
                color={isSelected ? theme.colors.surface : option.color}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Select a role to continue</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xxxl,
  },
  header: {
    marginBottom: theme.spacing.xxxl,
  },
  title: {
    ...theme.typography.display,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  rolesContainer: {
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.small,
    ...(Platform.OS === "web" && {
      outlineStyle: "none",
    }),
  },
  roleCardSelected: {
    borderColor: "transparent",
    ...theme.shadows.medium,
  },
  roleIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.lg,
  },
  roleIconSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  roleTitleSelected: {
    color: theme.colors.text,
  },
  roleDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  roleDescriptionSelected: {
    color: "rgba(255, 255, 255, 0.85)",
  },
  footer: {
    alignItems: "center",
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.xl,
  },
  footerText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
});
