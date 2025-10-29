import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useCallback } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/Component/Header";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { getRental } from "../../src/API/getApi";
import { IndianRupee } from "lucide-react-native";
import SegmentedToggle from "../../src/Component/SegmentedToggle";
import { formatDate, getStatusColor } from "../../src/utils/Formater";

export default function CustomerRentals() {
  const params = useLocalSearchParams();
  const [rentals, setRentals] = useState([]);
  const [allRentals, setAllRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const customerId = params.customerId;
  const customerName = params.customerName;
  const customerData = params.customerData
    ? JSON.parse(params.customerData)
    : null;

  console.log("CustomerRentals params:", params);

  useFocusEffect(
    useCallback(() => {
      fetchCustomerRentals();
    }, [customerId])
  );

  const fetchCustomerRentals = async () => {
    try {
      setLoading(true);
      const response = await getRental({
        clientId: customerId,
        limit: null,
        page: null,
      });
      console.log("All rentals response:", response);

      // Filter rentals for this specific customer
      const customerRentals =
        response.data?.rentals?.filter((rental) => {
          return (
            rental.customerId === customerId ||
            rental.customer === customerName ||
            rental.customerDetail?.customerName === customerName
          );
        }) || [];

      console.log("Filtered customer rentals:", customerRentals);
      setAllRentals(customerRentals);
      setRentals(customerRentals); // Initially show all rentals
    } catch (error) {
      console.error("Error fetching customer rentals:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterRentals = (status) => {
    setSelectedFilter(status);
    if (status === "All") {
      setRentals(allRentals);
    } else {
      const filteredRentals = allRentals.filter((rental) => {
        return rental.retalStatus === status;
      });
      setRentals(filteredRentals);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center p-4 border-b border-gray-200">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text className="text-xl font-bold ml-4">
            {customerName} - Rentals
          </Text>
        </View>

        {/* Customer Summary Card */}

        <ScrollView className="flex-1 px-4 py-4">
          {customerData && (
            <View className="my-4 bg-gray-950 rounded-lg p-4">
              <Text className="text-white text-lg font-bold mb-2">
                Customer Summary
              </Text>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">Total Rentals:</Text>
                <Text className="text-white font-medium">
                  {allRentals.length}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">Total Revenue:</Text>
                <Text className="text-white font-medium">
                  ₹
                  {allRentals.reduce(
                    (sum, rental) =>
                      sum +
                      (rental.totalRent || rental.itemDetail?.totalPrice || 0),
                    0
                  )}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">Pending:</Text>
                <Text className="text-yellow-400 font-medium">
                  {allRentals.filter((r) => r.retalStatus === "Pending").length}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Returned:</Text>
                <Text className="text-green-400 font-medium">
                  {
                    allRentals.filter((r) => r.retalStatus === "Returned")
                      .length
                  }
                </Text>
              </View>
            </View>
          )}
          <View className="mb-4 mx-3">
            <SegmentedToggle
              options={["All", "Pending", "Returned"]}
              onChange={(selectedOption) => {
                console.log("Filter selected:", selectedOption);
                filterRentals(selectedOption);
              }}
            />
          </View>
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500">Loading rentals...</Text>
            </View>
          ) : rentals.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500 text-lg">
                No rentals found for this customer
              </Text>
            </View>
          ) : (
            <View>
              {rentals.map((rental, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => {
                    console.log(
                      "Navigating to RentalDetails with data:",
                      rental
                    );
                    router.push({
                      pathname: "/(screen)/RentalDetails",
                      params: {
                        data: encodeURIComponent(JSON.stringify(rental)),
                      },
                    });
                  }}
                  className="bg-gray-950 rounded-lg p-4 mb-4 active:opacity-80"
                >
                  {/* Header with Item Name and Price */}
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-white text-lg font-bold flex-1">
                      {rental.itemDetail?.name || rental.name || "Item"}
                    </Text>
                    <View className="flex-row items-center">
                      <IndianRupee color="#ffffff" size={16} />
                      <Text className="text-white text-lg font-bold ml-1">
                        {rental.itemDetail?.totalPrice || rental.totalRent || 0}
                      </Text>
                    </View>
                  </View>

                  {/* Item Details */}
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-400">Size & Quantity:</Text>
                    <Text className="text-white">
                      {rental.itemDetail?.size || rental.size} ×{" "}
                      {rental.itemDetail?.quantity || rental.quantity}
                    </Text>
                  </View>

                  {/* Dates */}
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-400">Delivery:</Text>
                    <Text className="text-white">
                      {formatDate(rental.deliveryDate)}
                    </Text>
                  </View>

                  {rental.returnDate && (
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-gray-400">Return:</Text>
                      <Text className="text-white">
                        {formatDate(rental.returnDate)}
                      </Text>
                    </View>
                  )}

                  {/* Status and Duration */}
                  <View className="flex-row justify-between items-center">
                    <View
                      className={`px-3 py-1 rounded-full ${getStatusColor(rental.rentalStatus)}`}
                    >
                      <Text className="text-white text-xs font-medium">
                        {rental.rentalStatus || "Unknown"}
                      </Text>
                    </View>
                    <Text className="text-gray-400">
                      {rental.totalDays || 1} days
                    </Text>
                  </View>

                  {/* Advance Payment Info */}
                  {rental.itemDetail?.advanceAmount > 0 && (
                    <View className="mt-2 pt-2 border-t border-gray-700">
                      <View className="flex-row justify-between">
                        <Text className="text-green-400 text-sm">
                          Advance Paid: ₹{rental.itemDetail.advanceAmount}
                        </Text>
                        <Text className="text-orange-400 text-sm">
                          Remaining: ₹
                          {(rental.itemDetail.totalPrice || rental.totalRent) -
                            rental.itemDetail.advanceAmount}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Notes */}
                  {rental.notes && (
                    <View className="mt-2 pt-2 border-t border-gray-700">
                      <Text className="text-gray-400 text-sm italic">
                        {rental.notes}
                      </Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
