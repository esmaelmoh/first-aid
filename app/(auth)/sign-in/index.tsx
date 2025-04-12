// app/sign-in/index.tsx

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

interface SignInFormData {
  email: string;
  password: string;
}

// Validation schema
const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInPage: React.FC = () => {
  // const { signIn } = useAuth();
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
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
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

  const handleSignIn = async (data: SignInFormData) => {
    setLoading(true);
    try {
      // await signIn(data.email, data.password);
      showToast("Sign in successful!", "success");
      router.replace("/(tabs)");
    } catch (error) {
      showToast("Failed to sign in. Please check your credentials.", "error");
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
        {/* Welcome Section */}
        <View className="items-center mb-8">
          <FontAwesome5 name="user-circle" size={70} color="#451d35" />
          <Text className="text-3xl font-psemibold text-gray-800 mt-4">
            Welcome Back!
          </Text>
          <Text className="text-base font-pregular text-gray-600 mt-2 text-center">
            Please sign in to continue to your account.
          </Text>
        </View>

        {/* Sign In Form */}
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
        <View className="w-full mb-6">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            )}
          />
        </View>

        {/* Sign In Button */}
        <View className="w-full py-4">
          <Button
            onPress={handleSubmit(handleSignIn)}
            type="primary"
            title="Sign In"
            loading={loading}
          />
        </View>
        <TouchableOpacity onPress={() => router.replace("/forgot-password")}>
          <Text className="text--500 text-base font-pregular mt-2">
            Forgot your password?{" "}
            <Text className="font-psemibold">Reset it here</Text>
          </Text>
        </TouchableOpacity>
        {/* Additional Links */}
        <View className="text-center mt-4">
          <TouchableOpacity onPress={() => router.replace("/sign-up")}>
            <Text className="text--500 text-base font-pregular">
              Don't have an account?{" "}
              <Text className="font-psemibold">Sign up</Text>
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

export default SignInPage;
