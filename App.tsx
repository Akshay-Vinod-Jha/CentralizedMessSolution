import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Context Providers
import { AuthProvider } from "./src/context/AuthContext";
import { WalletProvider } from "./src/context/WalletContext";
import { OrderProvider } from "./src/context/OrderContext";

// Screens
import { SplashScreen } from "./src/screens/SplashScreen";
import { RoleSelectionScreen } from "./src/screens/RoleSelectionScreen";
import { StudentDashboardScreen } from "./src/screens/StudentDashboardScreen";
import { MessDiscoveryScreen } from "./src/screens/MessDiscoveryScreen";
import { MessDetailsScreen } from "./src/screens/MessDetailsScreen";
import { OrderMealScreen } from "./src/screens/OrderMealScreen";
import { MealCustomizationScreen } from "./src/screens/MealCustomizationScreen";
import { TokenWalletScreen } from "./src/screens/TokenWalletScreen";
import { ShareTokensScreen } from "./src/screens/ShareTokensScreen";
import { DeliveryRequestScreen } from "./src/screens/DeliveryRequestScreen";
import { MessOwnerDashboardScreen } from "./src/screens/MessOwnerDashboardScreen";
import { MenuManagementScreen } from "./src/screens/MenuManagementScreen";
import { ProviderDashboardScreen } from "./src/screens/ProviderDashboardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <WalletProvider>
          <OrderProvider>
            <NavigationContainer>
              <StatusBar style="dark" />
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  animation: "slide_from_right",
                }}
                initialRouteName="Splash"
              >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen
                  name="RoleSelection"
                  component={RoleSelectionScreen}
                />

                {/* Student Screens */}
                <Stack.Screen
                  name="StudentDashboard"
                  component={StudentDashboardScreen}
                />
                <Stack.Screen
                  name="MessDiscovery"
                  component={MessDiscoveryScreen}
                />
                <Stack.Screen
                  name="MessDetails"
                  component={MessDetailsScreen}
                />
                <Stack.Screen name="OrderMeal" component={OrderMealScreen} />
                <Stack.Screen
                  name="MealCustomization"
                  component={MealCustomizationScreen}
                />
                <Stack.Screen
                  name="TokenWallet"
                  component={TokenWalletScreen}
                />
                <Stack.Screen
                  name="ShareTokens"
                  component={ShareTokensScreen}
                />
                <Stack.Screen
                  name="DeliveryRequest"
                  component={DeliveryRequestScreen}
                />

                {/* Mess Owner Screens */}
                <Stack.Screen
                  name="MessOwnerDashboard"
                  component={MessOwnerDashboardScreen}
                />
                <Stack.Screen
                  name="MenuManagement"
                  component={MenuManagementScreen}
                />

                {/* Provider Screens */}
                <Stack.Screen
                  name="ProviderDashboard"
                  component={ProviderDashboardScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </OrderProvider>
        </WalletProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
