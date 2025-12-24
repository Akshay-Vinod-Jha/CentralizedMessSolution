import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { Mess, DietTag } from "../types";
import { getMesses } from "../utils/storage";
import { MessCard } from "../components";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const dietFilters: DietTag[] = ["Veg", "Non-Veg", "Vegan", "Jain", "Halal"];

export const MessDiscoveryScreen: React.FC<Props> = ({ navigation }) => {
  const [messes, setMesses] = useState<Mess[]>([]);
  const [filteredMesses, setFilteredMesses] = useState<Mess[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<DietTag[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "price">("rating");

  useEffect(() => {
    loadMesses();
  }, []);

  useEffect(() => {
    filterAndSortMesses();
  }, [messes, searchQuery, selectedFilters, sortBy]);

  const loadMesses = async () => {
    const messData = await getMesses();
    setMesses(messData);
  };

  const filterAndSortMesses = () => {
    let result = [...messes];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (mess) =>
          mess.name.toLowerCase().includes(query) ||
          mess.description.toLowerCase().includes(query) ||
          mess.location.toLowerCase().includes(query)
      );
    }

    // Apply diet filters
    if (selectedFilters.length > 0) {
      result = result.filter((mess) =>
        selectedFilters.some((filter) => mess.dietTags.includes(filter))
      );
    }

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => a.pricePerMeal - b.pricePerMeal);
    }

    setFilteredMesses(result);
  };

  const toggleFilter = (filter: DietTag) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const topRatedMesses = messes
    .filter((mess) => mess.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Discover Messes</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        {/* Search and Filters */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color={theme.colors.textSecondary}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search messes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme.colors.textLight}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
          >
            {dietFilters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  selectedFilters.includes(filter) && styles.filterChipActive,
                ]}
                onPress={() => toggleFilter(filter)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedFilters.includes(filter) &&
                      styles.filterChipTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sortContainer}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === "rating" && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy("rating")}
            >
              <Ionicons
                name="star"
                size={16}
                color={
                  sortBy === "rating"
                    ? theme.colors.surface
                    : theme.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === "rating" && styles.sortButtonTextActive,
                ]}
              >
                Top Rated
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === "price" && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy("price")}
            >
              <Ionicons
                name="pricetag"
                size={16}
                color={
                  sortBy === "price"
                    ? theme.colors.surface
                    : theme.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === "price" && styles.sortButtonTextActive,
                ]}
              >
                Best Price
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Rated Section */}
        {searchQuery === "" &&
          selectedFilters.length === 0 &&
          topRatedMesses.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⭐ Top Rated</Text>
              {topRatedMesses.map((mess) => (
                <MessCard
                  key={mess.id}
                  mess={mess}
                  onPress={() =>
                    navigation.navigate("MessDetails", { messId: mess.id })
                  }
                />
              ))}
            </View>
          )}

        {/* All Messes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery || selectedFilters.length > 0
              ? "Search Results"
              : "All Messes"}{" "}
            ({filteredMesses.length})
          </Text>

          {filteredMesses.length > 0 ? (
            filteredMesses.map((mess) => (
              <MessCard
                key={mess.id}
                mess={mess}
                onPress={() =>
                  navigation.navigate("MessDetails", { messId: mess.id })
                }
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="search-outline"
                size={64}
                color={theme.colors.textLight}
              />
              <Text style={styles.emptyText}>No messes found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or filters
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  searchSection: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  filtersContainer: {
    marginBottom: theme.spacing.md,
  },
  filterChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.background,
    marginRight: theme.spacing.sm,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
  },
  filterChipText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  filterChipTextActive: {
    color: theme.colors.surface,
    fontWeight: "600",
  },
  sortContainer: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  sortButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    gap: theme.spacing.xs,
  },
  sortButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  sortButtonText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  sortButtonTextActive: {
    color: theme.colors.surface,
    fontWeight: "600",
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  emptyContainer: {
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
