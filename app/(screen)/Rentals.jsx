import { View, Text, Pressable } from "react-native";
import React, { useState, useCallback } from "react";
import { getCustomers } from "../../src/API/getApi";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/Component/Header";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
export default function Rentals() {
  const [customer, setCustomer] = useState([]);
  useFocusEffect(
    useCallback(() => {
      console.log("Hellow");
      fetchCustomers();
    }, [])
  );
  //   useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const customersData = await getCustomers();
      setCustomer(customersData?.data.customers || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  // fetchCustomers();
  //   }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Header title={"Customer Details"} />
        <View className="px-4 gap-4">
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
                      customerData: JSON.stringify(item)
                    }
                  });
                }}
                className="flex flex-col p-3 shadow-md bg-gray-950 rounded-lg active:opacity-80"
              >
                <View className="flex flex-row justify-between w-full">
                  <Text className="text-white text-[16px] font-bold">
                    {item.customerName}
                  </Text>
                  <Text className="text-white flex flex-row justify-center items-center text-[20px]">
                    &#x20B9;{item.totalRent}
                  </Text>
                </View>
                <View className="flex flex-row gap-5">
                  {/* Delivery */}
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

                  {/* Returned */}
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
              </Pressable>
            ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
