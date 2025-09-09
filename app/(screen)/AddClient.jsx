import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BasicDetails from "../../src/Component/BasicDetails";
import SegmentedToggle from "../../src/Component/SegmentedToggle";
import AdvanceDetails from "../../src/Component/AdvanceDetails";

export default function AddClient() {
  const [basicAdvanceToggle, setBasicAdvanceToggle] = useState("Basic");
  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withTiming(45, { duration: 1000 });
  }, []);
  const animation = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          {/* Optional: Keep KAV for iOS bounce + statusbar spacing */}
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <KeyboardAwareScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1, padding: 16 }}
              enableOnAndroid
              extraScrollHeight={160}
              keyboardOpeningTime={0}
              keyboardShouldPersistTaps="handled"
              scrollToOverflowEnabled
            >
              <SegmentedToggle options={["Basic", "Advance"]} initial="Basic" onChange={setBasicAdvanceToggle} />
              <View className="h-4" />
              {basicAdvanceToggle === "Basic" ? (
                <BasicDetails />
              ) : (
                <AdvanceDetails />
              )}
              {/* <AdvanceDetails /> */}
            </KeyboardAwareScrollView>
          </KeyboardAvoidingView>

          <TouchableOpacity
            onPress={() => router.push("/(screen)/Dashboard")}
            className="absolute rounded-full z-50 p-5 bottom-5 right-5 bg-black/40"
          >
            {/*  */}
            <Animated.View style={animation}>
              <Plus color="#ffffff" />
              {/* hell */}
            </Animated.View>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
