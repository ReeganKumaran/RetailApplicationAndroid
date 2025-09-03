import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, use, useEffect } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function AddClient() {
  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withTiming(45, { duration: 1000 });
  }, []);
  const animation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <KeyboardAvoidingView className="flex-1" behavior="padding">
          <SafeAreaView className="flex-1">
            <TouchableOpacity
              onPress={() => {
                router.push("/(screen)/Dashboard");
              }}
              className="absolute rounded-full z-50 p-5 bottom-5 right-5 bg-black/40 "
            >
              <Animated.View style={animation}>
                <Plus color="#ffffff" />
              </Animated.View>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
              <View className="flex flex-col gap-4">
                <View className="">
                  <Text className="font-semibold text-base">
                    Enter your email:
                  </Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter email"
                    placeholderTextColor="#aaa"
                    // onChangeText={setEmail}
                    // value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
