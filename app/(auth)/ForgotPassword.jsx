import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { assets } from "../../assets/asset";
import { router } from "expo-router";

const ForgotPassword = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <LinearGradient
          className="h-[300px] w-full items-center justify-center "
          colors={["#2e2e2e", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Image
            // className="mt-10"
            source={assets.logoLight}
            style={{ height: 100, width: 100 }}
            resizeMode="contain"
          />
        </LinearGradient>
        <View className="flex rounded-t-[50px] -mt-[50px] z-50 w-full gap-4 p-[30px] shadow-2xs bg-white">
       
          <View className="">
            <Text className="font-semibold text-base">Enter your email:</Text>
            <TextInput
              className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
              placeholder="Enter email"
              // placeholderTextColor="#aaa"
              // onChangeText={setEmail}
              // value={email}
              // keyboardType="email-address"
              // autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            onPress={()=>router.push("/ResetPassword")}
            className="mt-4 p-5 rounded-lg bg-black items-center justify-center active:opacity-80"

          >
            <Text className="text-white font-semibold">Login</Text>
          </TouchableOpacity>
           <Text className="text-gray-400 text-[12px]">Enter your email address and {"we'll"} send you a link to reset your password.</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;
