// app/book-appointment/index.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "@/components/common/CustomButton";
import CustomToast from "@/components/common/CustomToast";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Picker } from "@react-native-picker/picker";

interface BookAppointmentFormData {
  hospital: string;
  doctor: string;
  date: string;
  timeSlot: string;
  paymentAmount: string;
  paymentMethod: string;
  transactionId: string;
}

// Validation schema
const bookAppointmentSchema = Yup.object().shape({
  hospital: Yup.string().required("Hospital selection is required"),
  doctor: Yup.string().required("Doctor selection is required"),
  date: Yup.string().required("Date is required"),
  timeSlot: Yup.string().required("Time slot selection is required"),
  paymentAmount: Yup.string()
    .required("Payment amount is required")
    .matches(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
  paymentMethod: Yup.string().required("Payment method selection is required"),
  transactionId: Yup.string().required("Transaction ID is required"),
});

const BookAppointmentPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [hospitals, setHospitals] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([
    "CBE",
    "Telebirr",
    "Dashen Bank",
  ]);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "info"
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookAppointmentFormData>({
    resolver: yupResolver(bookAppointmentSchema),
  });

  const selectedHospital = watch("hospital");
  const selectedDoctor = watch("doctor");

  useEffect(() => {
    // Fetch hospitals from API or use sample data
    setHospitals(["General Hospital", "City Clinic", "Downtown Medical"]);
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      // Fetch doctors based on hospital selection
      // Replace with actual API call
      setDoctors(["Dr. John Doe", "Dr. Jane Smith", "Dr. Emily Johnson"]);
    } else {
      setDoctors([]);
    }
    // Reset dependent fields when hospital changes
    setDates([]);
    setTimeSlots([]);
  }, [selectedHospital]);

  useEffect(() => {
    if (selectedDoctor) {
      // Fetch available dates based on doctor selection
      // Replace with actual API call
      setDates(["2024-05-01", "2024-05-02", "2024-05-03"]);
    } else {
      setDates([]);
    }
    // Reset dependent fields when doctor changes
    setTimeSlots([]);
  }, [selectedDoctor]);

  useEffect(() => {
    if (selectedDoctor && dates.length > 0) {
      // Fetch available time slots based on doctor and date
      // Replace with actual API call
      setTimeSlots([
        "09:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "02:00 PM - 03:00 PM",
        "03:00 PM - 04:00 PM",
      ]);
    } else {
      setTimeSlots([]);
    }
  }, [selectedDoctor, dates]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleBookAppointment = async (data: BookAppointmentFormData) => {
    setLoading(true);
    try {
      // Implement API call to book appointment
      // Example:
      // await api.bookAppointment(data);

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showToast("Appointment booked successfully!", "success");
      router.push("/booked-appointments");
    } catch (error) {
      console.error(error);
      showToast("Failed to book appointment. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center items-center px-6 py-8">
        {/* Appointment Form */}
        <View className="w-full mb-6">
          {/* Hospital Selection */}
          <Controller
            control={control}
            name="hospital"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="text-md font-pregular text-gray-600 mb-2">
                  Select Hospital
                </Text>
                <View className="border border-gray-300 rounded-md">
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                  >
                    <Picker.Item label="Select Hospital" value="" />
                    {hospitals.map((hospital, index) => (
                      <Picker.Item
                        key={index}
                        label={hospital}
                        value={hospital}
                      />
                    ))}
                  </Picker>
                </View>
                {errors.hospital && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.hospital.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Doctor Selection */}
          <Controller
            control={control}
            name="doctor"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="text-md font-pregular text-gray-600 mb-2">
                  Select Doctor
                </Text>
                <View className="border border-gray-300 rounded-md">
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    enabled={doctors.length > 0}
                  >
                    <Picker.Item label="Select Doctor" value="" />
                    {doctors.map((doctor, index) => (
                      <Picker.Item key={index} label={doctor} value={doctor} />
                    ))}
                  </Picker>
                </View>
                {errors.doctor && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.doctor.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Date Selection */}
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="text-md font-pregular text-gray-600 mb-2">
                  Select Date
                </Text>
                <View className="border border-gray-300 rounded-md">
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    enabled={dates.length > 0}
                  >
                    <Picker.Item label="Select Date" value="" />
                    {dates.map((date, index) => (
                      <Picker.Item key={index} label={date} value={date} />
                    ))}
                  </Picker>
                </View>
                {errors.date && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Time Slot Selection */}
          <Controller
            control={control}
            name="timeSlot"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="text-md font-pregular text-gray-600 mb-2">
                  Select Time Slot
                </Text>
                <View className="border border-gray-300 rounded-md">
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    enabled={timeSlots.length > 0}
                  >
                    <Picker.Item label="Select Time Slot" value="" />
                    {timeSlots.map((slot, index) => (
                      <Picker.Item key={index} label={slot} value={slot} />
                    ))}
                  </Picker>
                </View>
                {errors.timeSlot && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.timeSlot.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Payment Amount Input */}
          <Controller
            control={control}
            name="paymentAmount"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="text-md font-pregular text-gray-600 mb-2">
                  Enter Payment Amount
                </Text>
                <View className="border border-gray-300 rounded-md">
                  <TextInput
                    className="p-4 text-gray-800"
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
                {errors.paymentAmount && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.paymentAmount.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Payment Method Selection */}
          <Controller
            control={control}
            name="paymentMethod"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="text-md font-pregular text-gray-600 mb-2">
                  Select Payment Method
                </Text>
                <View className="border border-gray-300 rounded-md">
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                  >
                    <Picker.Item label="Select Payment Method" value="" />
                    {paymentMethods.map((method, index) => (
                      <Picker.Item key={index} label={method} value={method} />
                    ))}
                  </Picker>
                </View>
                {errors.paymentMethod && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.paymentMethod.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Transaction ID Input */}
          <Controller
            control={control}
            name="transactionId"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="text-md font-pregular text-gray-600 mb-2">
                  Enter Transaction ID
                </Text>
                <View className="border border-gray-300 rounded-md">
                  <TextInput
                    className="p-4 text-gray-800"
                    placeholder="Transaction ID"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
                {errors.transactionId && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.transactionId.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Submit Button */}
          <View className="mt-6">
            <Button
              title={loading ? "Booking..." : "Book Appointment"}
              onPress={handleSubmit(handleBookAppointment)}
              disabled={loading}
              icon={
                loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <FontAwesome5
                    name="calendar-check"
                    size={20}
                    color="#ffffff"
                  />
                )
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookAppointmentPage;
