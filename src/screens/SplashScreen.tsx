import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { useAuth } from "../context/AuthContext";
import { initializeMockData } from "../utils/mockData";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { user, role, isLoading } = useAuth();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize mock data
      await initializeMockData();

      // Wait for auth to load
      if (isLoading) {
        return;
      }

      // Small delay for splash effect
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate based on auth state
      if (user && role) {
        navigateToDashboard(role);
      } else {
        navigation.replace("RoleSelection");
      }
    } catch (error) {
      console.error("Error initializing app:", error);
      navigation.replace("RoleSelection");
    }
  };

  const navigateToDashboard = (userRole: string) => {
    switch (userRole) {
      case "student":
        navigation.replace("StudentDashboard");
        break;
      case "mess-owner":
        navigation.replace("MessOwnerDashboard");
        break;
      case "provider":
        navigation.replace("ProviderDashboard");
        break;
      default:
        navigation.replace("RoleSelection");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="restaurant" size={80} color={theme.colors.primary} />
        </View>

        <Text style={styles.title}>Mess Platform</Text>
        <Text style={styles.subtitle}>Your Campus Food Solution</Text>

        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={styles.loader}
        />
      </View>

      <Text style={styles.footer}>Powered by Token System</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.subtitle,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  loader: {
    marginTop: theme.spacing.xl,
  },
  footer: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
});
