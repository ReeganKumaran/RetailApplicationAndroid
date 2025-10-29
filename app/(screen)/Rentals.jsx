import { View, Text, Pressable, TextInput, ScrollView, Image } from "react-native";
import React, { useState, useCallback } from "react";
import { getCustomers } from "../../src/API/getApi";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/Component/Header";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { assets } from "../../assets/asset";
export default function Rentals() {
  const [customer, setCustomer] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
    }, [searchQuery])
  );
  //   useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const customersData = await getCustomers({
        search: searchQuery || undefined,
      });
      setCustomer(customersData?.data.customers || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  // fetchCustomers();
  //   }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <Header title={"Customer Details"} />

        {/* Search Bar */}
        <View className="px-4 pt-4 pb-2 mb-3">
          <View className="flex-row items-center bg-gray-300 rounded-full px-3 py-1">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder="Search customers..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </Pressable>
            )}
          </View>
        </View>

        <ScrollView className="flex-1">
          <View className="px-4 gap-4 pb-4">
            {/* <Text>Customers</Text> */}
            {/* <Text>{JSON.stringify(customer)} </Text> */}
            {customer.length > 0 &&
              customer?.map((item, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => {
                    console.log("Navigating to customer rentals:", item);
                    router.push({
                      pathname: "/(screen)/CustomerRentals",
                      params: {
                        customerId: item._id || item.id,
                        customerName: item.customerName,
                        customerData: JSON.stringify(item),
                      },
                    });
                  }}
                  className="flex flex-row p-3 shadow-md bg-gray-950 rounded-3xl active:opacity-80"
                >
                  <View className="flex flex-row justify-center items-center">
                    <Image
                      source={assets.profile}
                      className="w-16 h-16  overflow-hidden rounded-full"
                    />
                  </View>
                  <View className="ms-4 flex-1 justify-between w-full">
                    <View className="flex flex-row justify-between ">
                      <Text className="text-white text-[16px] font-bold">
                        {item.customerName}
                      </Text>
                      <Text className="text-white flex flex-row justify-center items-center text-[20px]">
                        &#x20B9;{item.totalRent}
                      </Text>
                    </View>
                    <View className="flex flex-row gap-5">
                      <View className="flex flex-row items-center gap-2">
                        <MaterialCommunityIcons
                          name="truck-delivery-outline"
                          size={24}
                          color="white"
                        />
                        <Text className="text-white text-[18px]">
                          {item.totalRented}
                        </Text>
                      </View>

                      <View className="flex flex-row items-center gap-2">
                        <Fontisto
                          name="arrow-return-left"
                          size={24}
                          color="white"
                        />
                        <Text className="text-white text-[18px]">
                          {item.totalReturned}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
