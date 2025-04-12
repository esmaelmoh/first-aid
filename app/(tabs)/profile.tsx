// app/ProfilePage.tsx

import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Headline from "@/components/common/Headline";
import { FontAwesome } from "@expo/vector-icons";
import Button from "@/components/common/CustomButton";
import { useRouter } from "expo-router";

// data/profile.ts

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export const sampleUserProfile: UserProfile = {
  id: "user_001",
  name: "Jane Doe",
  email: "janedoe@example.com",
  phoneNumber: "+251-912-345-678",
};

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const user: UserProfile = sampleUserProfile; // Using sample data

  const handleLogout = () => {
    // Implement logout functionality if necessary
    // For now, we'll navigate to the sign-in page
    router.push("/sign-in");
  };

  return (
    <ScrollView className="flex-1 px-6 py-6 bg-white">
      <View className="flex-1">
        {/* Profile Headline */}
        <Headline title="Your Profile" />

        {/* User Information Section */}
        <View className="space-y-4 mt-6">
          <Text className="text-lg font-psemibold text-gray-700 mb-2">
            Personal Information
          </Text>

          {/* Email Display */}
          {user.email && (
            <View className="bg-white p-4 rounded-lg border border-gray-100 flex-row items-center space-x-4 my-2">
              <FontAwesome name="envelope" size={24} />
              <Text className="text-lg font-psemibold text-gray-800 pl-2">
                {user.email}
              </Text>
            </View>
          )}

          {/* Phone Number Display */}
          {user.phoneNumber && (
            <View className="bg-white p-4 rounded-lg border border-gray-100 flex-row items-center space-x-4 my-2">
              <FontAwesome name="phone" size={24} color="#FFA001" />
              <Text className="text-md text-gray-600 font-pregular pl-2">
                Phone:{" "}
                <Text className="font-psemibold">{user.phoneNumber}</Text>
              </Text>
            </View>
          )}

          {/* Application Version Display */}
          <View className="bg-white p-4 rounded-lg border border-gray-100 flex-row items-center space-x-4 my-2">
            <FontAwesome name="info" size={24} color="#2196F3" />
            <Text className="text-md text-gray-600 font-pregular pl-2">
              App Version: <Text className="font-psemibold">1.0.0</Text>
            </Text>
          </View>
        </View>

        {/* Navigation Section */}
        <View className="space-y-4 mt-8">
          <Text className="text-lg font-psemibold text-gray-700 mb-2">
            Patient Features
          </Text>

          {/* Medical History Navigation */}
          <TouchableOpacity
            onPress={() => router.push("/patient-medical-history")}
            className="bg-white p-4 rounded-lg border border-gray-100 flex-row items-center space-x-4 my-2"
          >
            <FontAwesome name="file-medical" size={24} color="#4CAF50" />
            <Text className="text-md font-pregular text-gray-700 pl-2">
              View Medical History
            </Text>
          </TouchableOpacity>

          {/* Emergency Contacts Navigation */}
          <TouchableOpacity
            onPress={() => router.push("/manage-emergency-contacts")}
            className="bg-white p-4 rounded-lg border border-gray-100 flex-row items-center space-x-4 my-2"
          >
            <FontAwesome name="phone" size={24} color="#FF9800" />
            <Text className="text-md font-pregular text-gray-700 pl-2">
              Manage Emergency Contacts
            </Text>
          </TouchableOpacity>

          {/* Appointments Navigation */}
          <TouchableOpacity
            onPress={() => router.push("/booked-appointments")}
            className="bg-white p-4 rounded-lg border border-gray-100 flex-row items-center space-x-4 my-2"
          >
            <FontAwesome name="calendar-check" size={24} color="#3B82F6" />
            <Text className="text-md font-pregular text-gray-700 pl-2">
              View Appointments
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account Management Section */}
        <View className="space-y-4 mt-8">
          <Text className="text-lg font-psemibold text-gray-700 mb-2">
            Account Management
          </Text>
          <View className="bg-white p-4 rounded-lg border border-gray-100">
            <Button onPress={handleLogout} type="secondary" title="Logout" />
          </View>
        </View>
      </View>
      {/* Spacer for ScrollView */}
      <View className="h-16"></View>
    </ScrollView>
  );
};

export default ProfilePage;
