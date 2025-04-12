// app/(auth)/layout.tsx

import React from "react";
import { Stack } from "expo-router";

const AuthLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="subscription/index"
        options={{ title: "Subscription Details" }}
      />
      <Stack.Screen
        name="video-tut/index"
        options={{ title: "How to Upgrade" }}
      />
      <Stack.Screen
        name="payment/index"
        options={{ title: "Payment Information" }}
      />
      <Stack.Screen
        name="inactive/index"
        options={{ title: "Account Inactive" }}
      />
      <Stack.Screen
        name="suspended/index"
        options={{ title: "Account Suspended" }}
      />
      <Stack.Screen
        name="waiting-screen/index"
        options={{ title: "Waiting for Approval", headerTitleAlign: "center" }}
      />

      {/* <Stack.Screen
                name="forgot-password/index"
                options={{ headerShown: false }}
              /> */}
      {/* Add more screens as needed */}
    </Stack>
  );
};

export default AuthLayout;
