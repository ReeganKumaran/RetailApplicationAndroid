import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useLocalSearchParams } from "expo-router";
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
  
  return (
    <GestureHandlerRootView className="flex-1  ">
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          {/* Optional: Keep KAV for iOS bounce + statusbar spacing */}
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
                  value={basicAdvanceToggle}
                  onChange={setBasicAdvanceToggle}
                />
              </View>
              <View className="h-4" />
              {basicAdvanceToggle === "Basic" ? (
                <BasicDetails
                  customerData={parsedCustomerData}
                  disableCustomerInformation={disableEdit}
                  isEditMode={false}
                />
              ) : (
                <AdvanceDetails />
              )}
              {/* <AdvanceDetails /> */}
            </KeyboardAwareScrollView>
          </KeyboardAvoidingView>

          {/* <TouchableOpacity
            onPress={() => router.push("/(screen)/Dashboard")}
            className="absolute rounded-full z-50 p-5 bg-black/40"
            style={{ right: 20, bottom: fabBottom }}
          >
            <Animated.View style={animation}>
              <Plus color="#ffffff" />
            </Animated.View>
          </TouchableOpacity> */}
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
