// app/index.tsx

import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import WelcomeSection from "@/components/home/WelcomeBanner";
import Button from "@/components/common/CustomButton";
import CustomToast from "@/components/common/CustomToast";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Sample data for recent appointments
interface Appointment {
  id: string;
  doctor: string;
  date: string;
  timeSlot: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

const sampleAppointments: Appointment[] = [
  {
    id: "app_001",
    doctor: "Dr. John Doe",
    date: "2024-05-01",
    timeSlot: "10:00 AM - 11:00 AM",
    status: "Confirmed",
  },
  {
    id: "app_002",
    doctor: "Dr. Jane Smith",
    date: "2024-05-02",
    timeSlot: "2:00 PM - 3:00 PM",
    status: "Pending",
  },
];

const HomePage: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "info"
  );

  useEffect(() => {
    // Fetch appointments from API or use sample data
    // Replace with actual data fetching logic
    setAppointments(sampleAppointments);
  }, []);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1 bg-white px-4 py-8"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1">
        {/* Welcome Section */}
        <WelcomeSection />
        {/* Quick Actions */}
        <View className="mt-8">
          <Text className="text-xl font-psemibold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {/* Book Appointment */}
            <TouchableOpacity
              onPress={() => router.push("/book-appointment")}
              className="w-1/2 mb-4 items-center"
            >
              <View className="bg-indigo-100 p-4 rounded-lg">
                <FontAwesome5 name="calendar-plus" size={24} color="#4F46E5" />
                <Text className="mt-2 text-center text-gray-800 font-psemibold">
                  Book Appointment
                </Text>
              </View>
            </TouchableOpacity>

            {/* View Appointments */}
            <TouchableOpacity
              onPress={() => router.push("/booked-appointments")}
              className="w-1/2 mb-4 items-center"
            >
              <View className="bg-green-100 p-4 rounded-lg">
                <FontAwesome5 name="clipboard-list" size={24} color="#10B981" />
                <Text className="mt-2 text-center text-gray-800 font-psemibold">
                  My Appointments
                </Text>
              </View>
            </TouchableOpacity>

            {/* Manage Contacts */}
            <TouchableOpacity
              onPress={() => router.push("/manage-emergency-contacts")}
              className="w-1/2 mb-4 items-center"
            >
              <View className="bg-yellow-100 p-4 rounded-lg">
                <FontAwesome5 name="user-plus" size={24} color="#F59E0B" />
                <Text className="mt-2 text-center text-gray-800 font-psemibold">
                  Emergency Contacts
                </Text>
              </View>
            </TouchableOpacity>

            {/* Map to Hospitals */}
            <TouchableOpacity
              onPress={() => router.push("/map-to-hospitals")}
              className="w-1/2 mb-4 items-center"
            >
              <View className="bg-blue-100 p-4 rounded-lg">
                <FontAwesome5 name="map-marker-alt" size={24} color="#3B82F6" />
                <Text className="mt-2 text-center text-gray-800 font-psemibold">
                  Map to Hospitals
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Recent Appointments */}
        <View className="mt-8">
          <Text className="text-xl font-psemibold text-gray-800 mb-4">
            Recent Appointments
          </Text>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <View
                key={appointment.id}
                className="bg-white p-4 rounded-lg border border-gray-100 mb-4"
              >
                <Text className="text-lg font-psemibold text-gray-800">
                  {appointment.doctor}
                </Text>
                <Text className="text-md text-gray-600">
                  Date: {appointment.date}
                </Text>
                <Text className="text-md text-gray-600">
                  Time: {appointment.timeSlot}
                </Text>
                <Text
                  className={`text-md font-psemibold mt-1 ${
                    appointment.status === "Confirmed"
                      ? "text-green-500"
                      : appointment.status === "Pending"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {appointment.status}
                </Text>
                <Button
                  onPress={() =>
                    router.push(`/booked-appointments/${appointment.id}`)
                  }
                  type="secondary"
                  title="View Details"
                />
              </View>
            ))
          ) : (
            <Text className="text-gray-600">No appointments found.</Text>
          )}
        </View>
      </View>
      <View className="h-12"></View>
      {/* Toast Notification */}
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
      />
    </ScrollView>
  );
};

export default HomePage;
