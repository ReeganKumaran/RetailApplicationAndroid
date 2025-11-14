import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

export default function EditRental() {
  const router = useRouter();
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

  // Get route params
  const params = useLocalSearchParams();
  const { rental } = params;

  console.log("EditRental params:", params);

  // Parse rental data
  let parsedRentalData = null;
  if (rental) {
    try {
      parsedRentalData = JSON.parse(rental);
      console.log("Parsed rental data for editing");
    } catch (e) {
      console.error("Error parsing rental data:", e);
    }
  }

  // If no rental data, go back to dashboard
  if (!parsedRentalData) {
    useEffect(() => {
      router.replace("/(screen)/Dashboard");
    }, []);

    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <KeyboardAwareScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                flexGrow: 1,
                padding: 0,
                paddingBottom: fabBottom + 16,
              }}
              enableOnAndroid
              extraScrollHeight={160}
              keyboardOpeningTime={0}
              keyboardShouldPersistTaps="handled"
              scrollToOverflowEnabled
              className="bg-gray-50"
            >
              <View className="p-[16px]">
                <SegmentedToggle
                  options={["Basic", "Advance"]}
                  initial="Basic"
                  onChange={setBasicAdvanceToggle}
                />
              </View>
              <View className="h-4" />
              {basicAdvanceToggle === "Basic" ? (
                <BasicDetails
                  rentalData={parsedRentalData}
                  disableCustomerInformation={true}
                  isEditMode={true}
                />
              ) : (
                <AdvanceDetails />
              )}
            </KeyboardAwareScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
