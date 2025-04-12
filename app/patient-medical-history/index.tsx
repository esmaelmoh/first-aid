// app/patient-medical-history/index.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "@/components/common/CustomButton";
import CustomToast from "@/components/common/CustomToast";
import { useRouter } from "expo-router";

interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  prescriptions: string[];
  labResults: string;
}

const sampleMedicalRecords: MedicalRecord[] = [
  {
    id: "rec_001",
    date: "2024-04-15",
    diagnosis: "Hypertension",
    prescriptions: ["Medication A", "Medication B"],
    labResults: "Blood Pressure: 140/90",
  },
  {
    id: "rec_002",
    date: "2024-03-10",
    diagnosis: "Diabetes",
    prescriptions: ["Medication C"],
    labResults: "Blood Sugar: 150 mg/dL",
  },
  // Add more sample records as needed
  {
    id: "rec_003",
    date: "2024-02-20",
    diagnosis: "Asthma",
    prescriptions: ["Inhaler D"],
    labResults: "FEV1: 80%",
  },
  {
    id: "rec_004",
    date: "2024-01-05",
    diagnosis: "Migraine",
    prescriptions: ["Painkiller E"],
    labResults: "No significant findings",
  },
  {
    id: "rec_005",
    date: "2023-12-22",
    diagnosis: "Allergy",
    prescriptions: ["Antihistamine F"],
    labResults: "Elevated IgE levels",
  },
];

const PatientMedicalHistoryPage: React.FC = () => {
  const router = useRouter();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Simulate API call with timeout
    setLoading(true);
    setTimeout(() => {
      setRecords(sampleMedicalRecords);
      setLoading(false);
    }, 1000);
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

  const handleViewDetails = (id: string) => {
    router.push(`/patient-medical-history-details/${id}`);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 px-6 py-8">
        {/* Header Section */}
        <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
          Your Medical History
        </Text>

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator size="large" color="#0000ff" className="my-4" />
        )}

        {/* Medical Records List */}
        {!loading && records.length === 0 && (
          <Text className="text-lg text-center text-gray-600 mt-10">
            You have no medical records.
          </Text>
        )}

        {!loading && records.length > 0 && (
          <View className="space-y-6">
            {records.map((record) => (
              <View
                key={record.id}
                className="bg-white mt-4 p-5 rounded-lg border border-gray-200 shadow-md"
              >
                <View className="flex-row items-center mb-3">
                  <FontAwesome5
                    name="calendar-alt"
                    size={20}
                    color="#4F8EF7"
                    className="mr-3"
                  />
                  <Text className="text-lg font-semibold text-gray-800">
                    {record.date}
                  </Text>
                </View>
                <View className="flex-row items-center mb-2">
                  <FontAwesome5
                    name="diagnoses"
                    size={20}
                    color="#FF5733"
                    className="mr-3"
                  />
                  <Text className="text-md text-gray-700">
                    Diagnosis: {record.diagnosis}
                  </Text>
                </View>
                <View className="flex-row items-center mb-2">
                  <FontAwesome5
                    name="prescription-bottle-alt"
                    size={20}
                    color="#28A745"
                    className="mr-3"
                  />
                  <Text className="text-md text-gray-700">
                    Prescriptions: {record.prescriptions.join(", ")}
                  </Text>
                </View>
                <View className="flex-row items-center mb-4">
                  <FontAwesome5
                    name="vial"
                    size={20}
                    color="#FFC107"
                    className="mr-3"
                  />
                  <Text className="text-md text-gray-700">
                    Lab Results: {record.labResults}
                  </Text>
                </View>
                <Button
                  onPress={() => handleViewDetails(record.id)}
                  type="primary"
                  title="View Details"
                  icon={
                    <FontAwesome5
                      name="eye"
                      size={16}
                      color="#ffffff"
                      className="mr-2"
                    />
                  }
                  className="w-full"
                />
              </View>
            ))}
          </View>
        )}
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

export default PatientMedicalHistoryPage;
