import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/Component/Header";
import { Ionicons } from "@expo/vector-icons";

export default function RentalDetails() {
  const params = useLocalSearchParams();
  let rental = null;

  // Try different ways to get the rental data
  if (params.data) {
    try {
      rental = JSON.parse(decodeURIComponent(params.data));
    } catch (e) {
      console.error("Error parsing data param:", e);
    }
  } else if (params.rental) {
    try {
      rental = JSON.parse(params.rental);
    } catch (e) {
      console.error("Error parsing rental param:", e);
    }
  }

  console.log("RentalDetails params:", params);
  console.log("RentalDetails rental:", rental);

  if (!rental) {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <Header title="Rental Details" />
          <View className="flex-1 justify-center items-center">
            <Text>No rental details available</Text>
            <Text className="mt-2 text-gray-500">Params: {JSON.stringify(params)}</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white ">
        <View className="flex-row items-center p-4 border-b border-gray-200">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text className="text-xl font-bold ml-4">Rental Details</Text>
        </View>

        <ScrollView className="flex-1 px-4 py-4">
          {/* Customer Info Card */}
          <View className="bg-gray-950 rounded-lg p-4 mb-4">
            <Text className="text-white text-lg font-bold mb-2">Customer Information</Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Company</Text>
                <Text className="text-white font-medium">{rental.customer || "N/A"}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Contact Person</Text>
                <Text className="text-white font-medium">{rental.customerDetail?.customerName || "N/A"}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Phone</Text>
                <Text className="text-white">{rental.clientPhoneNumber || rental.customerDetail?.customerPhone || "N/A"}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Email</Text>
                <Text className="text-white">{rental.clientEmail || rental.customerDetail?.customerEmail || "N/A"}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Aadhaar</Text>
                <Text className="text-white">{rental.clientAadhaar || rental.customerDetail?.customerAadhar || "N/A"}</Text>
              </View>
            </View>
          </View>

          {/* Item Details Card */}
          <View className="bg-gray-950 rounded-lg p-4 mb-4">
            <Text className="text-white text-lg font-bold mb-2">Item Details</Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Item</Text>
                <Text className="text-white font-medium">{rental.itemDetail?.name || rental.name}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Size</Text>
                <Text className="text-white">{rental.itemDetail?.size || rental.size}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Quantity</Text>
                <Text className="text-white">{rental.itemDetail?.quantity || rental.quantity}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Price per unit</Text>
                <Text className="text-white">₹{rental.itemDetail?.price || rental.price}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Total Price</Text>
                <Text className="text-white font-bold text-lg">₹{rental.itemDetail?.totalPrice || rental.totalRent}</Text>
              </View>
              {rental.itemDetail?.advanceAmount > 0 && (
                <>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400">Advance Paid</Text>
                    <Text className="text-green-400 font-medium">₹{rental.itemDetail.advanceAmount}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400">Remaining Amount</Text>
                    <Text className="text-orange-400 font-medium">₹{(rental.itemDetail?.totalPrice || rental.totalRent) - rental.itemDetail.advanceAmount}</Text>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Rental Status Card */}
          <View className="bg-gray-950 rounded-lg p-4 mb-4">
            <Text className="text-white text-lg font-bold mb-2">Rental Status</Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Status</Text>
                <View className={`px-3 py-1 rounded-full ${rental.retalStatus === "Pending" ? "bg-yellow-600" : "bg-green-600"}`}>
                  <Text className="text-white text-xs font-medium">{rental.retalStatus || "N/A"}</Text>
                </View>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Delivery Date</Text>
                <Text className="text-white">{formatDate(rental.deliveryDate)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Return Date</Text>
                <Text className="text-white">{formatDate(rental.returnDate)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Total Days</Text>
                <Text className="text-white">{rental.totalDays || 1} days</Text>
              </View>
            </View>
          </View>

          {/* Customer Address Card */}
          {rental.customerDetail?.customerAddress && (
            <View className="bg-gray-950 rounded-lg p-4 mb-4">
              <Text className="text-white text-lg font-bold mb-2">Customer Address</Text>
              <Text className="text-gray-400">
                {[
                  rental.customerDetail.customerAddress.street,
                  rental.customerDetail.customerAddress.city,
                  rental.customerDetail.customerAddress.state,
                  rental.customerDetail.customerAddress.postalCode,
                  rental.customerDetail.customerAddress.country,
                  rental.customerDetail.customerAddress.landmark,
                ]
                  .filter(Boolean)
                  .join(", ") || "No address provided"}
              </Text>
            </View>
          )}

          {/* Delivery Address Card */}
          {rental.deliveryAddress && (
            <View className="bg-gray-950 rounded-lg p-4 mb-4">
              <Text className="text-white text-lg font-bold mb-2">Delivery Address</Text>
              <Text className="text-gray-400">
                {[
                  rental.deliveryAddress.street,
                  rental.deliveryAddress.city,
                  rental.deliveryAddress.state,
                  rental.deliveryAddress.postalCode,
                  rental.deliveryAddress.country,
                  rental.deliveryAddress.landmark,
                ]
                  .filter(Boolean)
                  .join(", ") || "No address provided"}
              </Text>
            </View>
          )}

          {/* Notes Card */}
          {rental.notes && (
            <View className="bg-gray-950 rounded-lg p-4 mb-8">
              <Text className="text-white text-lg font-bold mb-2">Notes</Text>
              <Text className="text-gray-400">{rental.notes}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}