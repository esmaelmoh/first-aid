// app/sign-up/index.tsx

import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "@/components/common/CustomButton";
import TextInput from "@/components/common/TextInput";
import CustomToast from "@/components/common/CustomToast";
import { useRouter } from "expo-router";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords do not match")
    .required("Confirm password is required"),
});

const SignUpPage: React.FC = () => {
  // const { signUp } = useAuth();
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
  } = useForm({
    resolver: yupResolver(schema),
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

  const handleSignUp = async (data: any) => {
    setLoading(true);
    try {
      // await signUp(data.email, data.password, {
      //   phoneNumber: data.phoneNumber,
      // });
      showToast("Sign up successful!", "success");
      router.replace("/(tabs)");
    } catch (error) {
      showToast("Failed to sign up. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
      <View className="flex-1 justify-center items-center px-6 py-8">
        {/* Welcome Section */}
        <View className="items-center mb-8">
          <FontAwesome5 name="user-plus" size={70} color="#451d35" />
          <Text className="text-3xl font-psemibold text-gray-800 mt-4">
            Create Your Account
          </Text>
          <Text className="text-base font-pregular text-gray-600 mt-2 text-center">
            Sign up to start your journey with us.
          </Text>
        </View>

        {/* Sign Up Form */}
        <View className="w-full ">
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
        <View className="w-full ">
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Phone Number"
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.phoneNumber?.message}
              />
            )}
          />
        </View>
        <View className="w-full ">
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
        <View className="w-full ">
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        {/* Sign Up Button */}
        <View className="bg-white w-full py-4">
          <Button
            onPress={handleSubmit(handleSignUp)}
            type="primary"
            title="Continue"
            loading={loading}
          />
        </View>

        {/* Sign In Link */}
        <View className="text-center mt-4">
          <TouchableOpacity onPress={() => router.replace("/sign-in")}>
            <Text className="text--500 text-base font-pregular">
              Already have an account?{" "}
              <Text className="font-psemibold">Sign in</Text>
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

export default SignUpPage;
