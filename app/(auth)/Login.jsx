import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { assets } from "../../assets/asset";
import { getLogin } from "../../src/API/APIEndpoint/Auth/auth";
import { validateEmail, validatePassword } from "../../src/helper/Validation";
export default function Login({ setIsNewUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const headerHeight = useHeaderHeight?.() ?? 0;
  const handlePress = async () => {
    try {
      if (!validateEmail(email)) {
        throw new Error("Invalid email format");
      } else if (!validatePassword(password)) {
        throw new Error("Invalid password format");
      } else {
        const res = await getLogin(email, password);
        setError("");
        console.log(res);
        router.push("/(auth)/Login.jsx");
      }
    } catch (error) {
      setError(error.message || "An error occurred during login");
    }
  };
  return (
    <GestureHandlerRootView className="flex-1 ">
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 ">
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
          {/* <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={headerHeight} // adjust if a header is present
          > */}
          <View className="flex rounded-t-[50px] -mt-[50px] z-50 w-full gap-4 p-[30px] shadow-2xs bg-white">
            {/* <ScrollView className="h-[29vh] z-50" contentContainerStyle={{ flexGrow: 1 }}> */}
            <View className="">
              <Text className="font-semibold text-base">Enter your email:</Text>
              <TextInput
                className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                placeholder="Enter email"
                placeholderTextColor="#aaa"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View>
              <Text className="font-semibold text-base">
                Enter your Password:
              </Text>
              <TextInput
                className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                placeholder="Enter password"
                placeholderTextColor="#aaa"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
              />
            </View>
            {/* <View className=""> */}
            <Text className="text-center">
              {"Don't have an account? "}
              <Text
                className="font-black"
                onPress={() => router.push("./SignUp")}
              >
                Sign Up
              </Text>
            </Text>
            {/* </View> */}

            {/* Error Message */}
            {error ? <Text className="text-red-500">{error}</Text> : null}

            {/* Button */}
            <TouchableOpacity
              onPress={handlePress}
              className="mt-4 p-5 rounded-lg bg-black items-center justify-center active:opacity-80"
            >
              <Text className="text-white font-semibold">Login</Text>
            </TouchableOpacity>
            {/* </ScrollView> */}
          </View>
          {/* <assets.login height={250} /> */}
          {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
