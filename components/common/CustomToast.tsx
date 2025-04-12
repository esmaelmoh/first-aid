import React, { useEffect, useState } from "react";
import { View, Text, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Importing icons from FontAwesome
import clsx from "clsx"; // Tailwind CSS helper library

interface CustomToastProps {
  visible: boolean;
  message: string;
  type?: "success" | "error" | "info";
}

const CustomToast: React.FC<CustomToastProps> = ({
  visible,
  message,
  type = "info",
}) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 2000); // Toast is visible for 2 seconds
      });
    }
  }, [visible, opacity]);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "info":
      default:
        return "bg-rose-500";
    }
  };

  const getIconName = () => {
    switch (type) {
      case "success":
        return "check-circle";
      case "error":
        return "times-circle";
      case "info":
      default:
        return "info-circle";
    }
  };

  return (
    <Animated.View
      style={{ opacity }}
      className={clsx(
        "absolute bottom-12 left-5 right-5 p-4 rounded-lg flex-row  items-center z-50",
        getBackgroundColor()
      )}
    >
      <FontAwesome
        name={getIconName()}
        size={24}
        color="#fff"
        className="mr-3"
      />
      <Text className="ml-5  text-white text-center font-psemibold">
        {message}
      </Text>
    </Animated.View>
  );
};

export default CustomToast;
