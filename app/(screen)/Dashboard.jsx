import {
  View,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Box, DollarSign, IndianRupee, Plus } from "lucide-react-native";
import SegmentedToggle from "../../src/Component/SegmentedToggle";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getClients } from "../../src/API/getApi";

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 32; // padding

const chartConfig = {
  backgroundGradientFrom: "#000000ff",
  backgroundGradientTo: "#0f172a",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForBackgroundLines: {
    strokeDasharray: "",
  },
  // propsForDots: { r: "4" },
};

const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [12, 19, 9, 24, 16, 20, 28],
      strokeWidth: 2,
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
  // const [resDate, setDate] = useState("");
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getClients();
        if (!cancelled) {
          console.log(res);
          // setDate(res);
        }
      } catch (e) {
        if (!cancelled) {
          console.warn("getClients failed", e);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push("/(screen)/AddClient");
  //   }, 500);
  // Your effect logic here
  // }, []);
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <KeyboardAvoidingView className="flex-1" behavior="padding">
          <SafeAreaView className="flex-1">
            <TouchableOpacity
              onPress={() => {
                handleAddClient();
              }}
              className="absolute rounded-full z-50 p-5 bottom-5 right-5 bg-black/40 "
            >
              <Plus color="#ffffff" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
              {/* Line Chart */}
              <View className="mt-2 flex flex-col gap-4">
                <LineChart
                  data={lineData}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={{ borderRadius: 16, alignSelf: "center" }}
                  withVerticalLines={false}
                />
                <View className="flex flex-row gap-2 pe-4 justify-between w-full">
                  <View className="flex w-1/3 flex-row bg-gray-800 p-4 rounded-lg ">
                    <Box color="#ffffff" />
                    <View className="ms-2">
                      <Text className="text-white">0</Text>
                      <Text className="text-white">Box </Text>
                    </View>
                  </View>
                  <View className="flex w-1/3 flex-row bg-gray-800 p-4 rounded-lg ">
                    <DollarSign color="#ffffff" />
                    <View className="ms-2">
                      <Text className="text-white">0</Text>
                      <Text className="text-white">Due </Text>
                    </View>
                  </View>
                  <View className="flex w-1/3 flex-row bg-gray-800 p-4 rounded-lg ">
                    <DollarSign color="#ffffff" />
                    <View className="ms-2">
                      <Text className="text-white">0</Text>
                      <Text className="text-white">Rent </Text>
                    </View>
                  </View>
                </View>
                <SegmentedToggle
                  onChange={(val) => {
                    console.log("Selected:", val);
                  }}
                />
                {Array.from({ length: 10 }).map((_, idx) => (
                  <View
                    key={idx}
                    className="flex flex-col p-3 shadow-md bg-gray-800 rounded-lg"
                  >
                    <View className="flex flex-row justify-between w-full">
                      <Text className="text-white text-[16px] font-bold">
                        Name
                      </Text>
                      <Text className="text-white flex flex-row justify-center items-center text-[20px]">
                        <IndianRupee color="#ffffff" size={14} />0
                      </Text>
                    </View>
                    <Text className="text-white text-[16px] ">Items type</Text>
                    <Text className="text-white text-[16px] ">Size 1x2 2</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
