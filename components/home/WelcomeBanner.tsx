// components/WelcomeSection.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PagerView from "react-native-pager-view";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.9;
const ITEM_HEIGHT = 180; // Optimized height for text focus

const data = [
  {
    title: "Emergency Assistance",
    subtitle: "Quick Help When You Need It Most",
    description:
      "Locate nearby hospitals and contact emergency services instantly.",
    buttonText: "Find Hospitals",
  },
  {
    title: "Appointment Management",
    subtitle: "Effortless Scheduling",
    description: "Book, view, and manage your medical appointments with ease.",
    buttonText: "Manage Appointments",
  },
];

const WelcomeSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePageSelected = (e: any) => {
    setActiveIndex(e.nativeEvent.position);
  };

  return (
    <View className="items-center">
      <PagerView
        style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        {data.map((item, index) => (
          <View key={index} className="flex-1">
            <LinearGradient
              colors={["#4F46E5", "#3B82F6"]} // Cool gradient for a professional look
              start={[0, 0]}
              end={[1, 1]}
              className="p-6 pb-12 mt-4 rounded-lg shadow-md"
              style={{ borderRadius: 12, overflow: "hidden" }}
            >
              <View>
                <Text className="text-xl font-bold text-white mb-2">
                  {item.title}
                </Text>
                <Text className="text-sm font-regular text-white mb-4">
                  {item.subtitle}
                </Text>
                <Text className="text-sm font-light text-white mb-6">
                  {item.description}
                </Text>
                <TouchableOpacity
                  className="bg-white rounded-full py-2 px-4 "
                  onPress={() => {
                    // Handle button action, e.g., navigate to a specific screen
                  }}
                >
                  <Text className="text-blue-600 text-sm font-semibold text-center">
                    {item.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        ))}
      </PagerView>
      <View className="flex-row mt-4">
        {data.map((_, index) => (
          <View
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === activeIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default WelcomeSection;
