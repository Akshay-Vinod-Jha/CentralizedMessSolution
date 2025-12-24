import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { MenuItem, DietTag } from "../types";
import { getMenuItems, saveMenuItems } from "../utils/storage";
import { MenuItemCard } from "../components";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const MenuManagementScreen: React.FC<Props> = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    const items = await getMenuItems();
    setMenuItems(items);
  };

  const toggleItemAvailability = async (itemId: string) => {
    const updatedItems = menuItems.map((item) =>
      item.id === itemId ? { ...item, available: !item.available } : item
    );
    setMenuItems(updatedItems);
    await saveMenuItems(updatedItems);
  };

  const handleAddItem = () => {
    Alert.alert(
      "Add Menu Item",
      "This feature allows you to add new menu items to your mess."
    );
    setIsAdding(false);
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
        <Text style={styles.title}>Menu Management</Text>
        <TouchableOpacity
          onPress={() => setIsAdding(true)}
          style={styles.addButton}
        >
          <Ionicons name="add-circle" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle"
            size={24}
            color={theme.colors.info}
          />
          <Text style={styles.infoText}>
            Toggle availability to show/hide items. Tap on an item to edit
            details.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Menu Items ({menuItems.length})
          </Text>

          {menuItems.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <MenuItemCard item={item} />

              <View style={styles.itemActions}>
                <TouchableOpacity
                  style={[
                    styles.availabilityButton,
                    item.available
                      ? styles.availableButton
                      : styles.unavailableButton,
                  ]}
                  onPress={() => toggleItemAvailability(item.id)}
                >
                  <Ionicons
                    name={item.available ? "checkmark-circle" : "close-circle"}
                    size={20}
                    color={theme.colors.surface}
                  />
                  <Text style={styles.availabilityText}>
                    {item.available ? "Available" : "Unavailable"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  addButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.info + "10",
    margin: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  itemContainer: {
    marginBottom: theme.spacing.md,
  },
  itemActions: {
    marginTop: theme.spacing.sm,
  },
  availabilityButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  availableButton: {
    backgroundColor: theme.colors.success,
  },
  unavailableButton: {
    backgroundColor: theme.colors.error,
  },
  availabilityText: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
    fontWeight: "600",
  },
});
