// app/tab-layout.tsx

import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";

const TabLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#3B82F680",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          height: 75,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="home" color={color} name="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="book-appointment"
        options={{
          title: "Book Appointment",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="calendar-plus"
              color={color}
              name="Book"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="emergency-institutions-filter"
        options={{
          title: "Emergency Services",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="hospital"
              color={color}
              name="Emergency"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="user"
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

interface TabIconProps {
  icon: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className="min-w-24 flex justify-center items-center gap-1 mt-3 ">
      <FontAwesome5 name={icon} size={24} color={color} />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};
