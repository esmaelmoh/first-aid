// app/patient-medical-history-details/index.tsx

import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "@/components/common/CustomButton";
import CustomToast from "@/components/common/CustomToast";
import { useRouter, useLocalSearchParams } from "expo-router";

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
];

const PatientMedicalHistoryDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "info"
  );

  useEffect(() => {
    // Fetch medical record by ID
    const foundRecord = sampleMedicalRecords.find((rec) => rec.id === id);
    if (foundRecord) {
      setRecord(foundRecord);
    } else {
      setToastMessage("Medical record not found.");
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

  if (!record) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </View>
    );
  }

  const handleDownloadReport = () => {
    // Implement download functionality
    showToast("Download functionality not implemented yet.", "info");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 px-6 py-8">
        {/* Medical Record Details */}
        <View className="space-y-4">
          <View className="bg-white p-4 rounded-lg border border-gray-100">
            <Text className="text-md font-psemibold text-gray-700">
              Date of Visit:
            </Text>
            <Text className="text-md text-gray-600">{record.date}</Text>
          </View>

          <View className="bg-white p-4 rounded-lg border border-gray-100">
            <Text className="text-md font-psemibold text-gray-700">
              Diagnosis:
            </Text>
            <Text className="text-md text-gray-600">{record.diagnosis}</Text>
          </View>

          <View className="bg-white p-4 rounded-lg border border-gray-100">
            <Text className="text-md font-psemibold text-gray-700">
              Prescriptions:
            </Text>
            {record.prescriptions.map((prescription, index) => (
              <Text key={index} className="text-md text-gray-600">
                - {prescription}
              </Text>
            ))}
          </View>

          <View className="bg-white p-4 rounded-lg border border-gray-100">
            <Text className="text-md font-psemibold text-gray-700">
              Lab Results:
            </Text>
            <Text className="text-md text-gray-600">{record.labResults}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-8 space-y-4">
          <Button
            onPress={handleDownloadReport}
            type="primary"
            title="Download Report"
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

export default PatientMedicalHistoryDetailsPage;
