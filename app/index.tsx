import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the sign-up screen after 5 seconds
    const timer = setTimeout(() => {
      router.replace("/(auth)/sign-up");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App</Text>
      <Text style={styles.subtitle}>Your journey begins here!</Text>
      <ActivityIndicator size="large" color="#451d35" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#451d35",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#957291",
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});
