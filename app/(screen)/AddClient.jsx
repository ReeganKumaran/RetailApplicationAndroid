import React, { useEffect } from "react";
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

export default function AddClient() {
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
              extraScrollHeight={60}
              keyboardOpeningTime={0}
              keyboardShouldPersistTaps="handled"
              scrollToOverflowEnabled
            >
              <View style={{ flex: 1, gap: 16 }}>
                <View>
                  <Text className="font-semibold text-base">Client Name:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Client Name"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>
                <View>
                  <Text className="font-semibold text-base">Phone Number:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Phone Number"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                  />
                </View>
                {/* <View>
                  <Text className="font-semibold text-base">Site Address:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Address"
                    placeholderTextColor="#aaa"
                    returnKeyType="next"
                  />
                </View> */}
                <View>
                  <Text className="font-semibold text-base">Item Name:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Item Name"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>{" "}
                <View>
                  <Text className="font-semibold text-base">Quantity:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Quantity"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>{" "}
                <View>
                  <Text className="font-semibold text-base">Size:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Size"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>{" "}
                <View>
                  <Text className="font-semibold text-base">Rate:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Client Name"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>{" "}
                <View>
                  <Text className="font-semibold text-base">Delivery Date:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Delivery Date"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>{" "}
                <View>
                  <Text className="font-semibold text-base">Return Date:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Return Date"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>{" "}
                <View>
                  <Text className="font-semibold text-base">Advance:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Advance Amount"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>
                <View>
                  <Text className="font-semibold text-base">Customer Name:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Customer Name"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>
                <View>
                  <Text className="font-semibold text-base">Customer Address:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Customer Address"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>
                <View>
                  <Text className="font-semibold text-base">Customer Aadhar:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Client Name"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>
                <View>
                  <Text className="font-semibold text-base">Client Name:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Client Name"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>
                <View>
                  <Text className="font-semibold text-base">Client Name:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Client Name"
                    placeholderTextColor="#aaa"
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>
                {/* ...repeat your other fields... */}
              </View>
            </KeyboardAwareScrollView>
          </KeyboardAvoidingView>

          <TouchableOpacity
            onPress={() => router.push("/(screen)/Dashboard")}
            className="absolute rounded-full z-50 p-5 bottom-5 right-5 bg-black/40"
          >
            <Animated.View style={animation}>
              <Plus color="#ffffff" />
            </Animated.View>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
