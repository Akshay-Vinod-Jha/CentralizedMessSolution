import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../utils/theme";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export const DeliveryRequestScreen: React.FC<Props> = ({ navigation }) => {
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instructions, setInstructions] = useState("");

  const deliveryFee = 2; // Fixed delivery fee in tokens

  const handleRequestDelivery = () => {
    if (
      !pickupAddress.trim() ||
      !deliveryAddress.trim() ||
      !phoneNumber.trim()
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    Alert.alert(
      "Confirm Delivery Request",
      `Delivery Fee: ${deliveryFee} tokens\n\nYour delivery request will be sent to nearby delivery partners.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            Alert.alert(
              "Success",
              "Delivery request submitted! A delivery partner will contact you soon.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.goBack(),
                },
              ]
            );
          },
        },
      ]
    );
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
        <Text style={styles.title}>Request Delivery</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="bicycle" size={32} color={theme.colors.primary} />
          <View style={styles.infoBannerText}>
            <Text style={styles.infoBannerTitle}>Food Delivery Service</Text>
            <Text style={styles.infoBannerSubtitle}>
              Get your mess food delivered to your location
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Pickup Location <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="restaurant-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={styles.input}
                placeholder="Mess name or location"
                value={pickupAddress}
                onChangeText={setPickupAddress}
                placeholderTextColor={theme.colors.textLight}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Delivery Address <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="location-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={styles.input}
                placeholder="Your room/hostel address"
                value={deliveryAddress}
                onChangeText={setDeliveryAddress}
                placeholderTextColor={theme.colors.textLight}
                multiline
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={styles.input}
                placeholder="Your contact number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor={theme.colors.textLight}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Special Instructions</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Any special instructions for delivery..."
                value={instructions}
                onChangeText={setInstructions}
                multiline
                numberOfLines={3}
                placeholderTextColor={theme.colors.textLight}
              />
            </View>
          </View>
        </View>

        {/* Fee Card */}
        <View style={styles.feeCard}>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Delivery Fee</Text>
            <Text style={styles.feeValue}>{deliveryFee} tokens</Text>
          </View>
          <Text style={styles.feeNote}>
            This fee supports local students who provide delivery services
          </Text>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Why use delivery?</Text>
          <View style={styles.benefit}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
            <Text style={styles.benefitText}>
              Food delivered fresh to your location
            </Text>
          </View>
          <View style={styles.benefit}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
            <Text style={styles.benefitText}>
              Save time when you're busy with studies
            </Text>
          </View>
          <View style={styles.benefit}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
            <Text style={styles.benefitText}>
              Support fellow students earning pocket money
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Request Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={handleRequestDelivery}
          activeOpacity={0.8}
        >
          <Text style={styles.requestButtonText}>Request Delivery</Text>
          <Text style={styles.requestButtonPrice}>{deliveryFee} tokens</Text>
        </TouchableOpacity>
      </View>
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
  infoBanner: {
    flexDirection: "row",
    backgroundColor: theme.colors.primaryLight,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.md,
  },
  infoBannerText: {
    flex: 1,
  },
  infoBannerTitle: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  infoBannerSubtitle: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  form: {
    padding: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    fontWeight: "600",
  },
  required: {
    color: theme.colors.error,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  feeCard: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  feeLabel: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
  },
  feeValue: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  feeNote: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontStyle: "italic",
  },
  benefitsCard: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  benefitsTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  benefit: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  benefitText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.large,
  },
  requestButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  requestButtonText: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
    fontWeight: "600",
  },
  requestButtonPrice: {
    ...theme.typography.h3,
    color: theme.colors.surface,
  },
});
