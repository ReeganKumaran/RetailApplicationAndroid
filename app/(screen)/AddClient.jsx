import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AdvanceDetails from "../../src/Component/AdvanceDetails";
import BasicDetails from "../../src/Component/BasicDetails";
import SegmentedToggle from "../../src/Component/SegmentedToggle";

export default function AddClient() {
  const [basicAdvanceToggle, setBasicAdvanceToggle] = useState("Basic");
  const rotation = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    rotation.value = withTiming(45, { duration: 1000 });
  }, []);

  const animation = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  const fabBottom = Math.max(insets.bottom, 12) + tabBarHeight + 8;

  // Get route params (for customer data if navigating from customer list)
  const params = useLocalSearchParams();
  const { customerData, disableEdit } = params;

  // Safely parse customerData if provided
  let parsedCustomerData = null;
  if (customerData) {
    try {
      parsedCustomerData = JSON.parse(customerData);
    } catch (e) {
      console.error("Error parsing customer data:", e);
    }
  }

  // If disableEdit comes as "true"/"false" string from params, normalize:
  const disableCustomerInformation =
    typeof disableEdit === "string"
      ? disableEdit === "true"
      : !!disableEdit;

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-50">
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={{ flex: 1 }}>
              {/* Toggle Header (non-scroll) */}
              <View className="p-[16px]">
                <SegmentedToggle
                  options={["Basic", "Advance"]}
                  value={basicAdvanceToggle}
                  onChange={setBasicAdvanceToggle}
                />
              </View>

              <View className="h-4" />

              {/* Content – BasicDetails handles its own scrolling via FlatList */}
              <View style={{ flex: 1 }}>
                {basicAdvanceToggle === "Basic" ? (
                  <BasicDetails
                    customerData={parsedCustomerData}
                    disableCustomerInformation={disableCustomerInformation}
                    isEditMode={false}
                  />
                ) : (
                  <AdvanceDetails />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
