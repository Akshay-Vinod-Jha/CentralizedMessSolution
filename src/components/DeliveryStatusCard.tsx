import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OrderStatus } from "../types";
import { theme } from "../utils/theme";

interface DeliveryStatusCardProps {
  status: OrderStatus;
  orderId: string;
  estimatedTime?: string;
}

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    description: string;
  }
> = {
  pending: {
    label: "Order Placed",
    icon: "time-outline",
    color: theme.colors.warning,
    description: "Your order has been received",
  },
  confirmed: {
    label: "Confirmed",
    icon: "checkmark-circle-outline",
    color: theme.colors.info,
    description: "Order confirmed by mess",
  },
  preparing: {
    label: "Preparing",
    icon: "restaurant-outline",
    color: theme.colors.secondary,
    description: "Your food is being prepared",
  },
  ready: {
    label: "Ready for Pickup",
    icon: "bag-check-outline",
    color: theme.colors.accent,
    description: "Order is ready",
  },
  delivered: {
    label: "Delivered",
    icon: "checkmark-done-circle",
    color: theme.colors.success,
    description: "Order completed",
  },
  cancelled: {
    label: "Cancelled",
    icon: "close-circle-outline",
    color: theme.colors.error,
    description: "Order was cancelled",
  },
};

export const DeliveryStatusCard: React.FC<DeliveryStatusCardProps> = ({
  status,
  orderId,
  estimatedTime,
}) => {
  const config = statusConfig[status];
  const steps: OrderStatus[] = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "delivered",
  ];
  const currentStepIndex = steps.indexOf(status);
  const isCancelled = status === "cancelled";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: config.color + "20" },
          ]}
        >
          <Ionicons name={config.icon} size={32} color={config.color} />
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.statusLabel}>{config.label}</Text>
          <Text style={styles.description}>{config.description}</Text>
          {estimatedTime && !isCancelled && status !== "delivered" && (
            <Text style={styles.estimatedTime}>Est. {estimatedTime}</Text>
          )}
        </View>
      </View>

      {!isCancelled && (
        <View style={styles.progressContainer}>
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const stepConfig = statusConfig[step];

            return (
              <View key={step} style={styles.stepContainer}>
                <View style={styles.stepIndicator}>
                  <View
                    style={[
                      styles.stepDot,
                      isCompleted && { backgroundColor: stepConfig.color },
                      !isCompleted && styles.stepDotInactive,
                    ]}
                  >
                    {isCompleted && (
                      <Ionicons
                        name="checkmark"
                        size={12}
                        color={theme.colors.surface}
                      />
                    )}
                  </View>
                  {index < steps.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        isCompleted && { backgroundColor: stepConfig.color },
                      ]}
                    />
                  )}
                </View>

                <Text
                  style={[
                    styles.stepLabel,
                    isCompleted && styles.stepLabelActive,
                  ]}
                >
                  {stepConfig.label}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.orderId}>Order ID: #{orderId.slice(-8)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.medium,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  statusLabel: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  estimatedTime: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
    fontWeight: "600",
  },
  progressContainer: {
    marginBottom: theme.spacing.md,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm,
  },
  stepIndicator: {
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xs,
  },
  stepDotInactive: {
    backgroundColor: theme.colors.border,
  },
  stepLine: {
    width: 2,
    height: 20,
    backgroundColor: theme.colors.border,
  },
  stepLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    paddingTop: 2,
  },
  stepLabelActive: {
    color: theme.colors.text,
    fontWeight: "600",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.md,
  },
  orderId: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});
