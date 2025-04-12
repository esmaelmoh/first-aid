// app/emergency-institution-details/index.tsx

import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "@/components/common/CustomButton";
import CustomToast from "@/components/common/CustomToast";
import { useRouter, useLocalSearchParams } from "expo-router";

interface EmergencyInstitution {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  services: string[];
}

const sampleInstitutions: EmergencyInstitution[] = [
  {
    id: "inst_001",
    name: "Addis Ababa General Hospital",
    address: "Kirkos, Addis Ababa",
    phoneNumber: "+251-113-123456",
    services: ["Emergency", "Surgery", "Cardiology"],
  },
  {
    id: "inst_002",
    name: "Mekelle Referral Hospital",
    address: "Mekelle, Tigray",
    phoneNumber: "+251-141-654321",
    services: ["Emergency", "Trauma Care"],
  },
];

const EmergencyInstitutionDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [institution, setInstitution] = useState<EmergencyInstitution | null>(
    null
  );
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "info"
  );

  useEffect(() => {
    // Fetch institution details by ID
    const foundInstitution = sampleInstitutions.find((inst) => inst.id === id);
    if (foundInstitution) {
      setInstitution(foundInstitution);
    } else {
      setToastMessage("Institution not found.");
      setToastType("error");
      setToastVisible(true);
    }
  }, [id]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  if (!institution) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 px-6 py-8">
        {/* Header Section */}

        {/* Institution Details */}
        <View className="space-y-4">
          <View className="bg-white p-4 rounded-lg border border-gray-100">
            <Text className="text-md font-psemibold text-gray-700">
              Address:
            </Text>
            <Text className="text-md text-gray-600">{institution.address}</Text>
          </View>

          <View className="bg-white p-4 rounded-lg border border-gray-100">
            <Text className="text-md font-psemibold text-gray-700">
              Contact:
            </Text>
            <Text className="text-md text-gray-600">
              Phone: {institution.phoneNumber}
            </Text>
          </View>

          <View className="bg-white p-4 rounded-lg border border-gray-100">
            <Text className="text-md font-psemibold text-gray-700">
              Services:
            </Text>
            {institution.services.map((service, index) => (
              <Text key={index} className="text-md text-gray-600">
                - {service}
              </Text>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-8 space-y-4">
          <Button
            onPress={() => router.push("/map-to-hospitals")}
            type="primary"
            title="Navigate to Hospital"
          />
          <Button
            onPress={() => router.push("/book-appointment")}
            type="primary"
            title="Book Appointment"
          />
        </View>
      </View>

      {/* Toast Notification */}
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
      />
    </ScrollView>
  );
};

export default EmergencyInstitutionDetailsPage;
