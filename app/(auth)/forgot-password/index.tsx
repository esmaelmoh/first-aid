// app/forgot-password/index.tsx

import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "@/components/common/CustomButton";
import TextInput from "@/components/common/TextInput";
import CustomToast from "@/components/common/CustomToast";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ForgotPasswordFormData {
  email: string;
}

// Validation schema
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPasswordPage: React.FC = () => {
  // const { forgotPassword } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "info"
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      // await forgotPassword(data.email);
      showToast(
        "Password reset email sent! Please check your inbox.",
        "success"
      );
      // Optionally, navigate back to sign-in page after a delay
      setTimeout(() => {
        router.replace("/sign-in");
      }, 3000);
    } catch (error: any) {
      // Extract error message from Firebase
      let message = "Failed to send password reset email.";
      if (error.code === "auth/user-not-found") {
        message = "No user found with this email address.";
      } else if (error.code === "auth/invalid-email") {
        message = "The email address is not valid.";
      }
      showToast(message, "error");
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
        {/* Header Section */}
        <View className="items-center mb-8">
          <FontAwesome5 name="lock" size={70} color="#3B82F6" />
          <Text className="text-3xl font-psemibold text-gray-800 mt-4">
            Forgot Password
          </Text>
          <Text className="text-base font-pregular text-gray-600 mt-2 text-center">
            Enter your email to receive a password reset link.
          </Text>
        </View>

        {/* Forgot Password Form */}
        <View className="w-full mb-6">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Email"
                keyboardType="email-address"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
        </View>

        {/* Submit Button */}
        <View className="w-full py-4">
          <Button
            onPress={handleSubmit(onSubmit)}
            type="primary"
            title="Send Reset Link"
            loading={loading}
          />
        </View>

        {/* Additional Links */}
        <View className="text-center mt-4">
          <TouchableOpacity onPress={() => router.replace("/sign-in")}>
            <Text className="text--500 text-base font-pregular">
              Remember your password?{" "}
              <Text className="font-psemibold">Sign In</Text>
            </Text>
          </TouchableOpacity>
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

export default ForgotPasswordPage;
