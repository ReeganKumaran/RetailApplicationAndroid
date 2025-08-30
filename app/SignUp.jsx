import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { router } from "expo-router";
import { assets } from "../assets/asset";
import { LinearGradient } from "expo-linear-gradient";

export default function SignUp() {
  return (
    <GestureHandlerRootView className="flex-1 ">
      <SafeAreaProvider>
        <KeyboardAvoidingView
          className="flex-1 "
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <SafeAreaView className="flex-1 ">
            <LinearGradient
              className="h-[300px] w-full items-center justify-center "
              colors={["#2e2e2e", "#000000"]} 
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image
                className="-mt-10"
                source={assets.logoLight}
                style={{ height: 100, width: 100 }}
                resizeMode="contain"
              />
            </LinearGradient>
            <ScrollView
              className="flex rounded-t-[50px] -mt-[50px] z-50 w-full gap-4 p-[30px] shadow-2xs bg-white"
              contentContainerStyle={{ gap: 12 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* <View className="flex w-full justify-center items-center"> */}

              {/* </View> */}
              {/* Email */}
              <Text className="font-semibold text-base">Enter your Name:</Text>
              <TextInput
                className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-white"
                placeholder="Enter Name"
                placeholderTextColor="#aaa"
                // onChangeText={setEmail}
                // value={email}
                keyboardType="name"
                autoCapitalize="none"
              />
              <Text className="font-semibold text-base">Enter your email:</Text>
              <TextInput
                className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-white"
                placeholder="Enter email"
                placeholderTextColor="#aaa"
                // onChangeText={setEmail}
                // value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password */}
              <Text className="font-semibold text-base">
                Enter your Password:
              </Text>
              <TextInput
                className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-white"
                placeholder="Enter password"
                placeholderTextColor="#aaa"
                // onChangeText={setPassword}
                // value={password}
                secureTextEntry
              />
              {/* <View className=""> */}
              <Text className="text-center">
                {"Already have an account? "}
                <Text
                  className="font-black"
                  onPress={() => router.push("./Login")}
                >
                  Login
                </Text>
              </Text>
              {/* </View> */}

              {/* Error Message */}
              {/* {error ? <Text className="text-red-500">{error}</Text> : null} */}

              {/* Button */}
              <TouchableOpacity
                // onPress={handlePress}
                className="mt-4 p-5 rounded-lg bg-black items-center justify-center active:opacity-80"
              >
                <Text className="text-white font-semibold">Login</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
