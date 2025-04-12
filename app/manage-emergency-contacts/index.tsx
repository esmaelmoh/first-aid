// app/manage-emergency-contacts/index.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  TextInput as RNTextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "@/components/common/CustomButton";
import CustomToast from "@/components/common/CustomToast";
import { useRouter } from "expo-router";

// Assuming you have a styled TextInput component that accepts className
import TextInput from "@/components/common/TextInput";

interface EmergencyContact {
  id: string;
  name: string;
  phoneNumber: string;
  relationship: string;
}

const sampleContacts: EmergencyContact[] = [
  {
    id: "contact_001",
    name: "Jane Doe",
    phoneNumber: "+251-911-123456",
    relationship: "Mother",
  },
  {
    id: "contact_002",
    name: "John Smith",
    phoneNumber: "+251-922-654321",
    relationship: "Brother",
  },
  // Add more sample contacts as needed
];

const ManageEmergencyContactsPage: React.FC = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "info"
  );

  const [newContact, setNewContact] = useState<{
    name: string;
    phoneNumber: string;
    relationship: string;
  }>({ name: "", phoneNumber: "", relationship: "" });

  // State for Edit Modal
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [contactToEdit, setContactToEdit] = useState<EmergencyContact | null>(
    null
  );
  const [editedContact, setEditedContact] = useState<{
    name: string;
    phoneNumber: string;
    relationship: string;
  }>({ name: "", phoneNumber: "", relationship: "" });

  useEffect(() => {
    // Fetch contacts from API or use sample data
    setContacts(sampleContacts);
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

  const handleAddContact = () => {
    if (
      !newContact.name ||
      !newContact.phoneNumber ||
      !newContact.relationship
    ) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    // // Simple phone number validation
    // const phoneRegex = /^\+251-\d{3}-\d{6}$/;
    // if (!phoneRegex.test(newContact.phoneNumber)) {
    //   showToast("Invalid phone number format. Use +251-XXX-XXXXXX.", "error");
    //   return;
    // }

    const newEntry: EmergencyContact = {
      id: `contact_${contacts.length + 1}`,
      ...newContact,
    };
    setContacts([...contacts, newEntry]);
    setNewContact({ name: "", phoneNumber: "", relationship: "" });
    showToast("Emergency contact added successfully!", "success");
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setContactToEdit(contact);
    setEditedContact({
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      relationship: contact.relationship,
    });
    setIsEditModalVisible(true);
  };

  const handleUpdateContact = () => {
    if (
      !editedContact.name ||
      !editedContact.phoneNumber ||
      !editedContact.relationship
    ) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    // Simple phone number validation
    const phoneRegex = /^\+251-\d{3}-\d{6}$/;
    if (!phoneRegex.test(editedContact.phoneNumber)) {
      showToast("Invalid phone number format. Use +251-XXX-XXXXXX.", "error");
      return;
    }

    if (contactToEdit) {
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === contactToEdit.id
            ? { ...contact, ...editedContact }
            : contact
        )
      );
      setIsEditModalVisible(false);
      setContactToEdit(null);
      showToast("Emergency contact updated successfully!", "success");
    }
  };

  const handleDeleteContact = (id: string) => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setContacts(contacts.filter((contact) => contact.id !== id));
            showToast("Emergency contact deleted.", "success");
          },
        },
      ]
    );
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
          Manage Emergency Contacts
        </Text>

        {/* Contacts List */}
        <View className="space-y-4">
          {contacts.map((contact) => (
            <View
              key={contact.id}
              className="bg-white p-4 mt-4 rounded-lg border border-gray-200 flex-row items-center justify-between"
            >
              <View>
                <Text className="text-lg font-semibold text-gray-800">
                  {contact.name}
                </Text>
                <Text className="text-md text-gray-600">
                  Phone: {contact.phoneNumber}
                </Text>
                <Text className="text-md text-gray-600">
                  Relationship: {contact.relationship}
                </Text>
              </View>
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  onPress={() => handleEditContact(contact)}
                  className="p-2 bg-yellow-200 rounded-full"
                >
                  <FontAwesome5 name="edit" size={16} color="#FFA500" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteContact(contact.id)}
                  className="p-2 bg-red-200 rounded-full"
                >
                  <FontAwesome5 name="trash" size={16} color="#FF4500" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Add New Contact */}
        <View className="mt-8">
          <Text className="text-lg font-semibold text-gray-700 mb-2">
            Add New Contact
          </Text>
          <TextInput
            label="Name"
            placeholder="Enter contact name"
            value={newContact.name}
            onChangeText={(text) =>
              setNewContact({ ...newContact, name: text })
            }
          />
          <TextInput
            label="Phone Number"
            keyboardType="phone-pad"
            placeholder="Enter phone number (e.g., +251-911-123456)"
            value={newContact.phoneNumber}
            onChangeText={(text) =>
              setNewContact({ ...newContact, phoneNumber: text })
            }
          />
          <TextInput
            label="Relationship"
            placeholder="Enter relationship"
            value={newContact.relationship}
            onChangeText={(text) =>
              setNewContact({ ...newContact, relationship: text })
            }
          />
          <Button
            onPress={handleAddContact}
            type="primary"
            title="Add Contact"
          />
        </View>
      </View>

      {/* Edit Contact Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-11/12">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Edit Contact
            </Text>
            <TextInput
              label="Name"
              placeholder="Enter contact name"
              value={editedContact.name}
              onChangeText={(text) =>
                setEditedContact({ ...editedContact, name: text })
              }
            />
            <TextInput
              label="Phone Number"
              keyboardType="phone-pad"
              placeholder="Enter phone number (e.g., +251-911-123456)"
              value={editedContact.phoneNumber}
              onChangeText={(text) =>
                setEditedContact({ ...editedContact, phoneNumber: text })
              }
            />
            <TextInput
              label="Relationship"
              placeholder="Enter relationship"
              value={editedContact.relationship}
              onChangeText={(text) =>
                setEditedContact({ ...editedContact, relationship: text })
              }
            />
            <View className="flex-row justify-end space-x-2">
              <Button
                onPress={() => setIsEditModalVisible(false)}
                type="secondary"
                title="Cancel"
              />
              <Button
                onPress={handleUpdateContact}
                type="primary"
                title="Update"
              />
            </View>
          </View>
        </View>
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

export default ManageEmergencyContactsPage;
