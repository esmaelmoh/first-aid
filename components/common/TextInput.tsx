import React from "react";
import {
  TextInput as RNTextInput,
  View,
  Text,
  TextInputProps as RNTextInputProps,
} from "react-native";

interface TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: string;
  keyboardType?: RNTextInputProps["keyboardType"]; // Allows custom keyboard types like 'email-address'
  autoCapitalize?: RNTextInputProps["autoCapitalize"]; // Allows setting auto-capitalization behavior
  errorMessage?: string; // Error message to display
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  style,
  keyboardType = "default", // Default keyboard type
  autoCapitalize = "sentences", // Default auto-capitalization
  errorMessage, // Error message prop
  ...restProps
}) => {
  // Determine if the input is for an email address
  const isEmail = keyboardType === "email-address";

  return (
    <View className={`w-full mb-4 ${style}`}>
      {label && (
        <Text className="text-sm text-textPrimary mb-2 font-pmedium">
          {label}
        </Text>
      )}
      <RNTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className={`w-full p-3 border rounded-lg bg-white text-textPrimary shadow-sm font-pregular ${
          errorMessage ? "border-red-500" : "border-gray-300"
        }`}
        placeholderTextColor="#999"
        keyboardType={isEmail ? "email-address" : keyboardType}
        autoCapitalize={isEmail ? "none" : autoCapitalize} // No capitalization for email
        {...restProps} // Spreading any additional props passed
      />
      {errorMessage && (
        <Text className="font-plight text-red-500 mt-1">{errorMessage}</Text>
      )}
    </View>
  );
};

export default TextInput;
