import { router } from "expo-router";
import { Box, DollarSign, IndianRupee } from "lucide-react-native";
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Pressable,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getRental } from "../../src/API/getApi";
import SegmentedToggle from "../../src/Component/SegmentedToggle";
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { rentalFormater } from "../../src/utils/Formater";

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
  console.log("Hello");
  router.push("/(screen)/AddClient");
};

export default function Dashboard() {
  const [rental, setRental] = useState([]);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      console.log("Hellow");
      getRentalData();
    }, [])
  );

  const getRentalData = async (option) => {
    try {
      if (option === "All") option = "";
      const res = await getRental(option);
      const rentals = Array.isArray(res.data?.rentals) ? res.data.rentals : [];
      setRental(rentals);
    } catch (error) {
      console.error("error : " + error.message);
    }
  };
  useEffect(() => {
    console.log("rental" + JSON.stringify(rental));
  }, [rental]);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <KeyboardAvoidingView className="flex-1" behavior="padding">
          <SafeAreaView className="flex-1">
            <View style={{ flex: 1 }}>
              {/* Scrollable Content */}
              <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
                {/* Line Chart */}
                <View className="mt-2 flex flex-col gap-4">
                  <BarChart
                    data={lineData}
                    width={chartWidth}
                    height={220}
                    chartConfig={chartConfig}
                    barRadius={6} // rounds the bar corners
                    barPercentage={0.7} // make bars wider so the radius is visible
                    withVerticalLines={false}
                    style={{ borderRadius: 16, alignSelf: "center" }}
                  />
                  <View className="flex flex-row gap-2 pe-4 justify-between w-full">
                    <View className="flex w-1/3 flex-row bg-gray-950 p-4 rounded-lg ">
                      <Box color="#ffffff" />
                      <View className="ms-2">
                        <Text className="text-white">0</Text>
                        <Text className="text-white">Box </Text>
                      </View>
                    </View>
                    <View className="flex w-1/3 flex-row bg-gray-950 p-4 rounded-lg ">
                      <DollarSign color="#ffffff" />
                      <View className="ms-2">
                        <Text className="text-white">0</Text>
                        <Text className="text-white">Due </Text>
                      </View>
                    </View>
                    <View className="flex w-1/3 flex-row bg-gray-950 p-4 rounded-lg ">
                      <DollarSign color="#ffffff" />
                      <View className="ms-2">
                        <Text className="text-white">0</Text>
                        <Text className="text-white">Rent </Text>
                      </View>
                    </View>
                  </View>
                  <SegmentedToggle
                    options={["All", "Returned", "Pending"]}
                    onChange={(val) => {
                      getRentalData(val);
                      // console.log("Selected:", val);
                    }}
                  />
                  {rental.length > 0 &&
                    rental?.map((item, idx) => (
                      <Pressable
                        key={idx}
                        onPress={() => {
                          console.log("Navigating with item:", item);
                          try {
                            // Try simpler navigation first
                            router.push(
                              `/(screen)/RentalDetails?id=${item._id || item.id}&data=${encodeURIComponent(JSON.stringify(item))}`
                            );
                          } catch (error) {
                            console.error("Navigation error:", error);
                          }
                        }}
                        className="flex flex-col p-3  shadow-md bg-gray-950 rounded-lg active:opacity-80"
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
              </ScrollView>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
