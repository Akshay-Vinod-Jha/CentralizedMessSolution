import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  Platform,
} from "react-native";

/**
 * Custom Button component that prevents weird border/highlight effects
 * Use this instead of TouchableOpacity for consistent behavior
 */
export const Button: React.FC<TouchableOpacityProps> = ({
  style,
  activeOpacity = 0.7,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={activeOpacity}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    // Remove default outline on web
    ...(Platform.OS === "web" && {
      outlineStyle: "none",
    }),
  },
});
