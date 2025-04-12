// components/common/Badge.tsx

import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface BadgeProps {
  label: string;
  value: number;
  color: "rose" | "green" | "red" | "yellow";
  icon: string;
}

const Badge: React.FC<BadgeProps> = ({ label, value, color, icon }) => {
  const colorMap = {
    rose: "border-rose-500 text-rose-500",
    green: "border-green-500 text-green-500",
    red: "border-red-500 text-red-500",
    yellow: "border-yellow-500 text-yellow-500",
  };

  const iconColor =
    color === "rose"
      ? "#1E40AF"
      : color === "green"
      ? "#10B981"
      : color === "red"
      ? "#EF4444"
      : "#F59E0B"; // yellow

  return (
    <View
      className={`flex-row items-center px-4 py-2 mt-2 rounded-full border ${colorMap[color]} space-x-2`}
    >
      <FontAwesome5 name={icon} size={16} color={iconColor} />
      <Text
        className={`text-sm font-psemibold ${colorMap[color].split(" ")[1]}`}
      >
        {label}
      </Text>
      <Text
        className={`text-sm font-pbold ${colorMap[color].split(" ")[1]} ml-2`}
      >
        {value}
      </Text>
    </View>
  );
};

export default Badge;
