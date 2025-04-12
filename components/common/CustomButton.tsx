// components/Button.tsx
import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: string;
  type?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading,
  disabled,
  style,
  type = "primary",
}) => {
  const gradientColors = ["#4F46E5", "#3B82F6"]; // Deep rose gradient // Gradient colors for primary button
  return (
    <TouchableOpacity
      className={`rounded-lg  ${disabled ? "opacity-50" : ""} ${style}`}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {type === "primary" ? (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-lg p-4 items-center"
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white text-center font-psemibold">
              {title}
            </Text>
          )}
        </LinearGradient>
      ) : (
        <View className="border border-gray-300 rounded-lg p-4 items-center">
          {loading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <Text className="text-blue-500 text-center font-bold">{title}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
