import { router } from "expo-router";
import { Box, DollarSign, IndianRupee } from "lucide-react-native";
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getCustomers, getRental } from "../../src/API/getApi";
import { StatsCardSkeleton, ChartSkeleton } from "../../src/Component/SkeletonLoaders";

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 32; // padding
const chartConfig = {
  backgroundGradientFrom: "#000000ff",
  backgroundGradientTo: "#410069ff",
  // backgroundGradientFromOpacity: 0.8,
  // backgroundGradientToOpacity: 0.8,
  fillShadowGradient: "#6f4cafff", // bar fill color
  fillShadowGradientOpacity: 1,
  decimalPlaces: 2, // number of decimal places in y values
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // axis label color
  labelColor: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
  barPercentage: 0.3, // bar width (0–1)

  propsForLabels: {
    fontSize: 12,
    fontWeight: "bold",
  },
  propsForBackgroundLines: {
    strokeDasharray: "", // solid lines
    strokeWidth: 0,
    stroke: "#ccc",
  },
};

const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      data: [12, 19, 9, 24, 16],
      strokeWidth: 2,
      borderRadius: 8,
    },
  ],
};

const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [30, 45, 28, 80, 60, 70],
    },
  ],
};

const handleAddClient = () => {
  router.push("/(screen)/AddClient");
};

export default function Dashboard() {
  const [rental, setRental] = useState([]);
  const [summary, setSummary] = useState({
    totalRented: 0,
    totalReturned: 0,
    activeRentals: 0,
    totalRent: 0,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [])
  );

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      const customerResponse = await getCustomers();
      const customers = Array.isArray(customerResponse?.data?.customers)
        ? customerResponse.data.customers
        : [];

      if (!customers.length) {
        setRental([]);
        setSummary({
          totalRented: 0,
          totalReturned: 0,
          activeRentals: 0,
          totalRent: 0,
        });
        return;
      }

      const aggregatedTotals = customers.reduce(
        (totals, customer) => {
          totals.totalRented += customer.totalRented || 0;
          totals.totalReturned += customer.totalReturned || 0;
          totals.activeRentals += customer.activeRentals || 0;
          totals.totalRent += customer.totalRent || 0;
          return totals;
        },
        { totalRented: 0, totalReturned: 0, activeRentals: 0, totalRent: 0 }
      );
      setSummary(aggregatedTotals);

      // const allRentals = [];
      // for (const customer of customers) {
      //   const customerId = customer._id || customer.id;
      //   if (!customerId) continue;

        try {
          const response = await getRental({limit:10, page:1, option: "Pending"});
          setRental(response?.data?.rentals || []);
          // const customerRentals = Array.isArray(response?.data?.rentals)
          //   ? response.data.rentals
          //   : [];

          // const normalizedRentals = customerRentals.map((item) => ({
          //   ...item,
          //   customer: item.customer || customer.customerName,
          // }));
          // allRentals.push(...normalizedRentals);
        } catch (customerError) {
          console.error(
            "Failed to load rentals for customer:",
            // customerId,
            customerError?.message || customerError
          );
        }
      // }

      // setRental(allRentals);
    } catch (error) {
      console.error("Error loading dashboard data:", error?.message || error);
      setError("Unable to load dashboard data.");
      setRental([]);
      setSummary({
        totalRented: 0,
        totalReturned: 0,
        activeRentals: 0,
        totalRent: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <KeyboardAvoidingView className="flex-1" behavior="padding">
          <SafeAreaView className="flex-1">
            <View style={{ flex: 1 }}>
              {/* Scrollable Content */}
              <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
                {/* Skeleton Loading for Charts and Stats */}
                {loading ? (
                  <View className="mt-2 flex flex-col gap-4">
                    <ChartSkeleton />
                    <View className="flex flex-row gap-2 justify-between w-full">
                      <StatsCardSkeleton />
                      <StatsCardSkeleton />
                      <StatsCardSkeleton />
                    </View>
                  </View>
                ) : (
                  <View className="mt-2 flex flex-col gap-4">
                    <BarChart
                      data={lineData}
                      width={chartWidth}
                      height={220}
                      chartConfig={chartConfig}
                      barRadius={6}
                      barPercentage={0.7}
                      withVerticalLines={false}
                      style={{ borderRadius: 16, alignSelf: "center" }}
                    />
                    <View className="flex flex-row gap-2 pe-4 justify-between w-full">
                    <View className="flex w-1/3 flex-row bg-gray-950 p-4 rounded-3xl ">
                      <Box color="#ffffff" />
                      <View className="ms-2">
                        <Text className="text-white">
                          {summary.totalRented}
                        </Text>
                        <Text className="text-white">Rented</Text>
                      </View>
                    </View>
                    <View className="flex w-1/3 flex-row bg-gray-950 p-4 rounded-3xl ">
                      <DollarSign color="#ffffff" />
                      <View className="ms-2">
                        <Text className="text-white">
                          {summary.activeRentals}
                        </Text>
                        <Text className="text-white">Active</Text>
                      </View>
                    </View>
                    <View className="flex w-1/3 flex-row bg-gray-950 p-4 rounded-3xl ">
                      <DollarSign color="#ffffff" />
                      <View className="ms-2">
                        <Text className="text-white">{summary.totalRent}</Text>
                        <Text className="text-white">Rent</Text>
                      </View>
                    </View>
                    </View>
                    {error.length > 0 && (
                      <Text className="text-red-500 text-center">{error}</Text>
                    )}
                    {!error && rental.length === 0 && (
                      <Text className="text-gray-400 text-center">
                        No rentals available.
                      </Text>
                    )}
                    {rental.length > 0 &&
                      rental.map((item, idx) => (
                        <Pressable
                          key={idx}
                          onPress={() => {
                            console.log("Navigating with item:", item);
                            try {
                              router.push(
                                `/(screen)/RentalDetails?id=${item._id || item.id}&data=${encodeURIComponent(JSON.stringify(item))}`
                              );
                            } catch (error) {
                              console.error("Navigation error:", error);
                            }
                          }}
                          className="flex flex-col py-3 px-5  shadow-md bg-gray-950 rounded-3xl active:opacity-80"
                        >
                          <View className="flex flex-row justify-between w-full font-bold">
                            <Text className="text-white text-[16px] ">
                              {item.customer || item.customerDetail?.customerName}
                            </Text>
                            <Text className="text-white flex flex-row justify-center items-center text-[20px]">
                              <IndianRupee color="#ffffff" size={14} />
                              {item.itemDetail?.totalPrice ||
                                item.totalRent ||
                                item.price}
                            </Text>
                          </View>
                          <Text className="text-white text-[16px] ">
                            {item.itemDetail?.name || item.name}
                          </Text>
                          <Text className="text-white text-[16px] ">
                            {item.itemDetail?.size || item.size} &bull;{" "}
                            {item.itemDetail?.quantity || item.quantity} pcs
                          </Text>
                        </Pressable>
                      ))}
                  </View>
                )}
              </ScrollView>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
