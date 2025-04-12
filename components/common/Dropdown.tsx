import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface DropdownProps {
  label: string;
  placeholder: string;
  options: { label: string; value: string }[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  options,
  selectedValue,
  onValueChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-700 mb-2 font-psemibold">{label}</Text>
      <TouchableOpacity
        className="flex-row justify-between items-center p-3 border border-gray-300 rounded-lg bg-white shadow-sm"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-base text-gray-600 flex-1 font-pregular">
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
        </Text>
        <FontAwesome name="chevron-down" size={16} color="#888" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // Ensures the modal closes on back button press
      >
        <View className="flex-1 justify-center items-center">
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Full-screen background with 50% opacity
            }}
          />
          <View className="w-11/12 max-h-64 bg-white rounded-lg p-4 shadow-lg">
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 border-b border-gray-200"
                  onPress={() => handleSelect(item.value)}
                >
                  <Text className="text-base text-gray-700 font-pregular">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropdown;
