// app/booked-appointments/index.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "@/components/common/CustomButton";
import CustomToast from "@/components/common/CustomToast";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import TextInput from "@/components/common/TextInput";

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
  {
    id: "app_003",
    doctor: "Dr. Emily Johnson",
    date: "2024-05-03",
    timeSlot: "11:00 AM - 12:00 PM",
    status: "Cancelled",
  },
  {
    id: "app_004",
    doctor: "Dr. Michael Brown",
    date: "2024-05-04",
    timeSlot: "1:00 PM - 2:00 PM",
    status: "Confirmed",
  },
  {
    id: "app_005",
    doctor: "Dr. Sarah Lee",
    date: "2024-05-05",
    timeSlot: "3:00 PM - 4:00 PM",
    status: "Pending",
  },
];

const availableDates = [
  "2024-05-06",
  "2024-05-07",
  "2024-05-08",
  "2024-05-09",
  "2024-05-10",
];

const availableTimeSlots = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
];

const BookedAppointmentsPage: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isRescheduleModalVisible, setIsRescheduleModalVisible] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // States for rescheduling
  const [newDate, setNewDate] = useState<string>(availableDates[0]);
  const [newTimeSlot, setNewTimeSlot] = useState<string>(availableTimeSlots[0]);

  useEffect(() => {
    // Fetch appointments from API or use sample data
    // Simulating API call with timeout
    setLoading(true);
    setTimeout(() => {
      setAppointments(sampleAppointments);
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
    router.push(`/booked-appointments/${id}`);
  };

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(availableDates[0]);
    setNewTimeSlot(availableTimeSlots[0]);
    setIsRescheduleModalVisible(true);
  };

  const handleCancel = (appointment: Appointment) => {
    if (appointment.status === "Cancelled") {
      showToast("Appointment is already cancelled.", "info");
      return;
    }

    Alert.alert(
      "Confirm Cancellation",
      "Are you sure you want to cancel this appointment?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // Simulate API call
            setLoading(true);
            setTimeout(() => {
              setAppointments((prevAppointments) =>
                prevAppointments.map((app) =>
                  app.id === appointment.id
                    ? { ...app, status: "Cancelled" }
                    : app
                )
              );
              showToast("Appointment cancelled successfully.", "success");
              setLoading(false);
            }, 1000);
          },
        },
      ]
    );
  };

  const handleRescheduleSubmit = () => {
    if (!selectedAppointment) return;

    // Validate selections
    if (!newDate || !newTimeSlot) {
      showToast("Please select both date and time slot.", "error");
      return;
    }

    // Simulate API call for rescheduling
    setLoading(true);
    setTimeout(() => {
      setAppointments((prevAppointments) =>
        prevAppointments.map((app) =>
          app.id === selectedAppointment.id
            ? {
                ...app,
                date: newDate,
                timeSlot: newTimeSlot,
                status: "Pending",
              }
            : app
        )
      );
      showToast("Appointment rescheduled successfully.", "success");
      setIsRescheduleModalVisible(false);
      setSelectedAppointment(null);
      setLoading(false);
    }, 1000);
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
          Your Booked Appointments
        </Text>

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator size="large" color="#0000ff" className="my-4" />
        )}

        {/* Appointments List */}
        {!loading && appointments.length === 0 && (
          <Text className="text-lg text-center text-gray-600 mt-10">
            You have no booked appointments.
          </Text>
        )}

        {!loading && appointments.length > 0 && (
          <View className="space-y-4">
            {appointments.map((appointment) => (
              <View
                key={appointment.id}
                className={`bg-white p-4 rounded-lg border ${
                  appointment.status === "Cancelled"
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200"
                } shadow-md`}
              >
                <View className="flex-row items-center mb-2">
                  <FontAwesome5
                    name="user-md"
                    size={24}
                    color="#4F8EF7"
                    className="mr-3"
                  />
                  <View>
                    <Text className="text-xl font-semibold text-gray-800">
                      {appointment.doctor}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      Date: {appointment.date}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      Time: {appointment.timeSlot}
                    </Text>
                  </View>
                </View>
                <Text
                  className={`text-sm font-semibold mt-1 ${
                    appointment.status === "Confirmed"
                      ? "text-green-600"
                      : appointment.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-600"
                  }`}
                >
                  Status: {appointment.status}
                </Text>

                <View className="flex-row justify-between mt-4">
                  <Button
                    onPress={() => handleViewDetails(appointment.id)}
                    type="secondary"
                    title="View Details"
                    icon={
                      <FontAwesome5
                        name="eye"
                        size={16}
                        color="#ffffff"
                        className="mr-2"
                      />
                    }
                    className="flex-1 mr-2"
                  />
                  <Button
                    onPress={() => handleReschedule(appointment)}
                    type="secondary"
                    title="Reschedule"
                    icon={
                      <FontAwesome5
                        name="redo"
                        size={16}
                        color="#ffffff"
                        className="mr-2"
                      />
                    }
                    className="flex-1 mr-2"
                  />
                  <Button
                    onPress={() => handleCancel(appointment)}
                    type="secondary"
                    title="Cancel"
                    icon={
                      <FontAwesome5
                        name="times"
                        size={16}
                        color="#ffffff"
                        className="mr-2"
                      />
                    }
                    className="flex-1"
                    disabled={appointment.status === "Cancelled"}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Reschedule Modal */}
      <Modal
        visible={isRescheduleModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsRescheduleModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setIsRescheduleModalVisible(false)}
        >
          <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
            <TouchableWithoutFeedback>
              <View className="bg-white w-11/12 p-6 rounded-lg">
                <Text className="text-xl font-bold text-gray-800 mb-4">
                  Reschedule Appointment
                </Text>

                {/* Select New Date */}
                <Text className="text-md font-medium text-gray-600 mb-2">
                  Select New Date
                </Text>
                <View className="border border-gray-300 rounded-md mb-4">
                  <Picker
                    selectedValue={newDate}
                    onValueChange={(itemValue) => setNewDate(itemValue)}
                    className="h-10"
                  >
                    {availableDates.map((date) => (
                      <Picker.Item key={date} label={date} value={date} />
                    ))}
                  </Picker>
                </View>

                {/* Select New Time Slot */}
                <Text className="text-md font-medium text-gray-600 mb-2">
                  Select New Time Slot
                </Text>
                <View className="border border-gray-300 rounded-md mb-6">
                  <Picker
                    selectedValue={newTimeSlot}
                    onValueChange={(itemValue) => setNewTimeSlot(itemValue)}
                    className="h-10"
                  >
                    {availableTimeSlots.map((slot) => (
                      <Picker.Item key={slot} label={slot} value={slot} />
                    ))}
                  </Picker>
                </View>

                {/* Buttons */}
                <View className="flex-row justify-end space-x-2">
                  <Button
                    onPress={() => setIsRescheduleModalVisible(false)}
                    type="secondary"
                    title="Cancel"
                    className="flex-1"
                  />
                  <Button
                    onPress={handleRescheduleSubmit}
                    type="primary"
                    title="Submit"
                    className="flex-1"
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Toast Notification */}
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
      />
    </ScrollView>
  );
};

export default BookedAppointmentsPage;
