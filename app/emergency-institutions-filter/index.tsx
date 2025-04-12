// app/emergency-institutions-filter/index.tsx

import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "@/components/common/CustomButton";
import CustomToast from "@/components/common/CustomToast";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

interface EmergencyInstitution {
  id: string;
  name: string;
  specialty: string;
  services: string[];
  availability: string;
  distance: number; // Distance in kilometers
}

const sampleInstitutions: EmergencyInstitution[] = [
  {
    id: "inst_001",
    name: "Addis Ababa General Hospital",
    specialty: "Cardiology",
    services: ["Emergency", "Surgery"],
    availability: "Open Now",
    distance: 5.2,
  },
  {
    id: "inst_002",
    name: "Mekelle Referral Hospital",
    specialty: "Trauma Care",
    services: ["Emergency"],
    availability: "24/7",
    distance: 12.7,
  },
  {
    id: "inst_003",
    name: "Gondar University Hospital",
    specialty: "Neurology",
    services: ["Emergency", "Neurology"],
    availability: "Open Now",
    distance: 8.5,
  },
  {
    id: "inst_004",
    name: "Bahir Dar Medical Center",
    specialty: "Orthopedics",
    services: ["Emergency", "Orthopedics"],
    availability: "24/7",
    distance: 15.3,
  },
  {
    id: "inst_005",
    name: "Dire Dawa Health Institute",
    specialty: "Pediatrics",
    services: ["Emergency", "Pediatrics"],
    availability: "Open Now",
    distance: 20.1,
  },
  {
    id: "inst_006",
    name: "Harar Regional Hospital",
    specialty: "Gastroenterology",
    services: ["Emergency", "Gastroenterology"],
    availability: "24/7",
    distance: 18.4,
  },
  {
    id: "inst_007",
    name: "Jimma University Medical Center",
    specialty: "Oncology",
    services: ["Emergency", "Oncology"],
    availability: "Open Now",
    distance: 25.6,
  },
  {
    id: "inst_008",
    name: "Hawassa Comprehensive Hospital",
    specialty: "Endocrinology",
    services: ["Emergency", "Endocrinology"],
    availability: "24/7",
    distance: 30.2,
  },
  {
    id: "inst_009",
    name: "Shashemene General Hospital",
    specialty: "Dermatology",
    services: ["Emergency", "Dermatology"],
    availability: "Open Now",
    distance: 22.9,
  },
  {
    id: "inst_010",
    name: "Assosa Referral Hospital",
    specialty: "Ophthalmology",
    services: ["Emergency", "Ophthalmology"],
    availability: "24/7",
    distance: 28.3,
  },
  {
    id: "inst_011",
    name: "Wolaita Sodo Comprehensive Hospital",
    specialty: "Nephrology",
    services: ["Emergency", "Nephrology"],
    availability: "Open Now",
    distance: 19.7,
  },
  {
    id: "inst_012",
    name: "Awassa Regional Referral Hospital",
    specialty: "Hematology",
    services: ["Emergency", "Hematology"],
    availability: "24/7",
    distance: 24.5,
  },
  {
    id: "inst_013",
    name: "Arba Minch General Hospital",
    specialty: "Psychiatry",
    services: ["Emergency", "Psychiatry"],
    availability: "Open Now",
    distance: 17.8,
  },
  {
    id: "inst_014",
    name: "Goba University Hospital",
    specialty: "Pulmonology",
    services: ["Emergency", "Pulmonology"],
    availability: "24/7",
    distance: 21.4,
  },
  {
    id: "inst_015",
    name: "Bale Regional Hospital",
    specialty: "Urology",
    services: ["Emergency", "Urology"],
    availability: "Open Now",
    distance: 27.6,
  },
  {
    id: "inst_016",
    name: "Harari Health Center",
    specialty: "Rheumatology",
    services: ["Emergency", "Rheumatology"],
    availability: "24/7",
    distance: 16.9,
  },
  {
    id: "inst_017",
    name: "Debre Birhan Hospital",
    specialty: "Otolaryngology",
    services: ["Emergency", "Otolaryngology"],
    availability: "Open Now",
    distance: 23.1,
  },
  {
    id: "inst_018",
    name: "Dessie Referral Hospital",
    specialty: "Geriatrics",
    services: ["Emergency", "Geriatrics"],
    availability: "24/7",
    distance: 26.4,
  },
  {
    id: "inst_019",
    name: "Sodo General Hospital",
    specialty: "Allergology",
    services: ["Emergency", "Allergology"],
    availability: "Open Now",
    distance: 14.8,
  },
  {
    id: "inst_020",
    name: "Jijiga Regional Hospital",
    specialty: "Immunology",
    services: ["Emergency", "Immunology"],
    availability: "24/7",
    distance: 29.5,
  },
];

const EmergencyInstitutionsFilterPage: React.FC = () => {
  const router = useRouter();
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [availabilityOptions, setAvailabilityOptions] = useState<string[]>([
    "Open Now",
    "24/7",
  ]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<
    EmergencyInstitution[]
  >([]);

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");

  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "info"
  );

  useEffect(() => {
    // Extract unique specialties and services from institutions
    const uniqueSpecialties = Array.from(
      new Set(sampleInstitutions.map((inst) => inst.specialty))
    );
    setSpecialties(uniqueSpecialties);

    const uniqueServices = Array.from(
      new Set(sampleInstitutions.flatMap((inst) => inst.services))
    );
    setServices(uniqueServices);

    // Initially list all institutions
    setFilteredInstitutions(sampleInstitutions);
  }, []);

  const handleApplyFilter = () => {
    let results = sampleInstitutions;

    if (selectedSpecialty) {
      results = results.filter((inst) => inst.specialty === selectedSpecialty);
    }

    if (selectedService) {
      results = results.filter((inst) =>
        inst.services.includes(selectedService)
      );
    }

    if (selectedAvailability) {
      results = results.filter(
        (inst) => inst.availability === selectedAvailability
      );
    }

    setFilteredInstitutions(results);
    showToast("Filters applied successfully.", "success");
  };

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
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
          Emergency Institutions
        </Text>

        {/* Filter Options */}
        <View className="space-y-4">
          {/* Specialty Filter */}
          <View>
            <Text className="text-md font-medium text-gray-600 mb-2">
              Specialty
            </Text>
            <View className="border border-gray-300 rounded-md">
              <Picker
                selectedValue={selectedSpecialty}
                onValueChange={(itemValue) => setSelectedSpecialty(itemValue)}
                className="h-10"
              >
                <Picker.Item label="All Specialties" value="" />
                {specialties.map((specialty, index) => (
                  <Picker.Item
                    key={index}
                    label={specialty}
                    value={specialty}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Services Filter */}
          <View>
            <Text className="text-md font-medium text-gray-600 mb-2">
              Services
            </Text>
            <View className="border border-gray-300 rounded-md">
              <Picker
                selectedValue={selectedService}
                onValueChange={(itemValue) => setSelectedService(itemValue)}
                className="h-10"
              >
                <Picker.Item label="All Services" value="" />
                {services.map((service, index) => (
                  <Picker.Item key={index} label={service} value={service} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Availability Filter */}
          <View>
            <Text className="text-md font-medium text-gray-600 mb-2">
              Availability
            </Text>
            <View className="border border-gray-300 rounded-md">
              <Picker
                selectedValue={selectedAvailability}
                onValueChange={(itemValue) =>
                  setSelectedAvailability(itemValue)
                }
                className="h-10"
              >
                <Picker.Item label="All Availability" value="" />
                {availabilityOptions.map((avail, index) => (
                  <Picker.Item key={index} label={avail} value={avail} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Apply Filter Button */}
          <Button
            onPress={handleApplyFilter}
            type="primary"
            title="Apply Filter"
          />
        </View>

        {/* Filtered Institutions List */}
        <View className="mt-8">
          {filteredInstitutions.length === 0 ? (
            <Text className="text-lg text-center text-gray-600">
              No institutions match the selected filters.
            </Text>
          ) : (
            <View className="space-y-4">
              {filteredInstitutions.map((inst) => (
                <TouchableOpacity
                  key={inst.id}
                  onPress={() =>
                    router.push(`/emergency-institution-details/${inst.id}`)
                  }
                  className="bg-white mt-4 p-4 rounded-lg border border-gray-200 flex-row justify-between items-center shadow-md"
                >
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-800 mb-1">
                      {inst.name}
                    </Text>
                    <View className="flex-row items-center mb-1">
                      <FontAwesome5
                        name="briefcase-medical"
                        size={16}
                        color="#4F8EF7"
                        className="mr-2"
                      />
                      <Text className="text-sm text-gray-600">
                        {inst.specialty}
                      </Text>
                    </View>
                    <View className="flex-row items-center mb-1">
                      <FontAwesome5
                        name="stethoscope"
                        size={16}
                        color="#4F8EF7"
                        className="mr-2"
                      />
                      <Text className="text-sm text-gray-600">
                        Services: {inst.services.join(", ")}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <FontAwesome5
                        name="clock"
                        size={16}
                        color="#4F8EF7"
                        className="mr-2"
                      />
                      <Text className="text-sm text-gray-600">
                        Availability: {inst.availability}
                      </Text>
                    </View>
                  </View>
                  <View className="flex items-center">
                    <FontAwesome5
                      name="map-marker-alt"
                      size={20}
                      color="#FF5733"
                      className="mb-1"
                    />
                    <Text className="text-sm text-gray-700">
                      {inst.distance} km
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
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

export default EmergencyInstitutionsFilterPage;
