import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

interface TimeSlot {
  id: string;
  time: string;
  mealType: string;
  isActive: boolean;
}

interface DaySchedule {
  day: string;
  isActive: boolean;
}

export const DeliveryScheduleScreen: React.FC<Props> = ({ navigation }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: "1",
      time: "7:00 AM - 9:00 AM",
      mealType: "Breakfast",
      isActive: true,
    },
    { id: "2", time: "12:00 PM - 2:00 PM", mealType: "Lunch", isActive: true },
    { id: "3", time: "4:00 PM - 6:00 PM", mealType: "Snacks", isActive: true },
    { id: "4", time: "7:00 PM - 9:00 PM", mealType: "Dinner", isActive: true },
  ]);

  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>([
    { day: "Monday", isActive: true },
    { day: "Tuesday", isActive: true },
    { day: "Wednesday", isActive: true },
    { day: "Thursday", isActive: true },
    { day: "Friday", isActive: true },
    { day: "Saturday", isActive: true },
    { day: "Sunday", isActive: false },
  ]);

  const toggleTimeSlot = (id: string) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id ? { ...slot, isActive: !slot.isActive } : slot
      )
    );
  };

  const toggleDay = (day: string) => {
    setWeekSchedule(
      weekSchedule.map((schedule) =>
        schedule.day === day
          ? { ...schedule, isActive: !schedule.isActive }
          : schedule
      )
    );
  };

  const activeSlots = timeSlots.filter((s) => s.isActive).length;
  const activeDays = weekSchedule.filter((d) => d.isActive).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Delivery Schedule</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Ionicons name="time" size={24} color={theme.colors.primary} />
            <View style={styles.summaryText}>
              <Text style={styles.summaryValue}>{activeSlots}/4</Text>
              <Text style={styles.summaryLabel}>Active Time Slots</Text>
            </View>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Ionicons name="calendar" size={24} color={theme.colors.accent} />
            <View style={styles.summaryText}>
              <Text style={styles.summaryValue}>{activeDays}/7</Text>
              <Text style={styles.summaryLabel}>Active Days</Text>
            </View>
          </View>
        </View>

        {/* Time Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ Daily Time Slots</Text>
          <Text style={styles.sectionSubtitle}>
            Set when you're available to deliver meals
          </Text>

          {timeSlots.map((slot) => (
            <View key={slot.id} style={styles.slotCard}>
              <View style={styles.slotInfo}>
                <View style={styles.slotIcon}>
                  <Ionicons
                    name={
                      slot.mealType === "Breakfast"
                        ? "sunny"
                        : slot.mealType === "Lunch"
                        ? "restaurant"
                        : slot.mealType === "Snacks"
                        ? "cafe"
                        : "moon"
                    }
                    size={24}
                    color={
                      slot.isActive
                        ? theme.colors.primary
                        : theme.colors.textLight
                    }
                  />
                </View>
                <View style={styles.slotDetails}>
                  <Text style={styles.slotMealType}>{slot.mealType}</Text>
                  <Text style={styles.slotTime}>{slot.time}</Text>
                </View>
              </View>

              <View style={styles.slotToggle}>
                <Switch
                  value={slot.isActive}
                  onValueChange={() => toggleTimeSlot(slot.id)}
                  trackColor={{
                    false: theme.colors.textLight,
                    true: theme.colors.primary,
                  }}
                  thumbColor={
                    slot.isActive
                      ? theme.colors.surface
                      : theme.colors.textSecondary
                  }
                />
              </View>
            </View>
          ))}
        </View>

        {/* Weekly Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Weekly Schedule</Text>
          <Text style={styles.sectionSubtitle}>
            Choose which days you're available
          </Text>

          <View style={styles.daysGrid}>
            {weekSchedule.map((schedule) => (
              <TouchableOpacity
                key={schedule.day}
                style={[
                  styles.dayCard,
                  schedule.isActive && styles.dayCardActive,
                ]}
                onPress={() => toggleDay(schedule.day)}
              >
                <Text
                  style={[
                    styles.dayInitial,
                    schedule.isActive && styles.dayInitialActive,
                  ]}
                >
                  {schedule.day.charAt(0)}
                </Text>
                <Text
                  style={[
                    styles.dayName,
                    schedule.isActive && styles.dayNameActive,
                  ]}
                >
                  {schedule.day.substring(0, 3)}
                </Text>
                {schedule.isActive && (
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={theme.colors.primary}
                    style={styles.dayCheck}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle"
            size={24}
            color={theme.colors.warning}
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Delivery Tips</Text>
            <Text style={styles.infoText}>
              • Accept orders at least 30 min before delivery time{"\n"}• Keep
              students updated on order status{"\n"}• Maintain consistent
              delivery times for better ratings
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
  content: {
    flex: 1,
  },
  summaryCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  summaryItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  summaryText: {
    flex: 1,
  },
  summaryValue: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontWeight: "bold",
  },
  summaryLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.spacing.md,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  sectionSubtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  slotCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  slotInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  slotIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary + "10",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  slotDetails: {
    flex: 1,
  },
  slotMealType: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    fontWeight: "600",
  },
  slotTime: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  slotToggle: {
    marginLeft: theme.spacing.md,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  dayCard: {
    width: "13%",
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xs,
    borderWidth: 2,
    borderColor: "transparent",
    ...theme.shadows.small,
  },
  dayCardActive: {
    backgroundColor: theme.colors.primary + "10",
    borderColor: theme.colors.primary,
  },
  dayInitial: {
    ...theme.typography.h3,
    color: theme.colors.textSecondary,
    fontWeight: "bold",
  },
  dayInitialActive: {
    color: theme.colors.primary,
  },
  dayName: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  dayNameActive: {
    color: theme.colors.primary,
  },
  dayCheck: {
    position: "absolute",
    top: 2,
    right: 2,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.warning + "10",
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 20,
  },
});
