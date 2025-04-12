// components/Headline.tsx
import React from "react";
import { Text, View } from "react-native";

interface HeadlineProps {
  title: string;
}

const Headline: React.FC<HeadlineProps> = ({ title }) => {
  return (
    <View className="my-4">
      <Text className="text-subheading font-psemibold text-textPrimary">
        {title}
      </Text>
    </View>
  );
};

export default Headline;
