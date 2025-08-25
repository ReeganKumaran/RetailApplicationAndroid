import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getLogin } from "../src/API/APIEndpoint/Auth/auth";
import { validateEmail, validatePassword } from "../src/helper/Validation";
// import { Image } from "react-native-web";
import logo from "../assets/images/Logo.png";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handlePress = async () => {
    try {
      if (!validateEmail(email)) {
        throw new Error("Invalid email format");
      }
      if (!validatePassword(password)) {
        throw new Error("Invalid password format");
      }
      await getLogin(email, password);
    } catch (error) {
      console.error("Login error:", error);
      setError(error);
    }
  };
  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <GestureHandlerRootView className="flex-1 ">
      <SafeAreaProvider>
        <KeyboardAvoidingView
          className="flex-1 "
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <SafeAreaView className="flex-1">
            <ScrollView
              contentContainerStyle={{ gap: 12, padding: 16 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* <View className="flex w-full justify-center items-center"> */}
              <View className="flex-1 justify-center items-center">
                <Image
                  source={logo}
                  style={{ width: 120, height: 120 }}
                  resizeMode="contain"
                />
              </View>
              {/* </View> */}
              {/* Email */}
              <Text className="font-semibold text-base">Enter your email:</Text>
              <TextInput
                className="bg-[#eee] border-2 border-[#ccc] rounded-lg p-3 text-white"
                placeholder="Enter email"
                placeholderTextColor="#aaa"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password */}
              <Text className="font-semibold text-base">
                Enter your Password:
              </Text>
              <TextInput
                className="bg-[#eee] border-2 border-[#ccc] rounded-lg p-3 text-white"
                placeholder="Enter password"
                placeholderTextColor="#aaa"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
              />

              {/* Button */}
              <TouchableOpacity
                onPress={handlePress}
                className="mt-4 h-12 rounded-lg bg-black items-center justify-center active:opacity-80"
              >
                <Text className="text-white font-semibold">Submit</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
