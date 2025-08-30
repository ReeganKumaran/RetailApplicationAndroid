import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getLogin } from "../src/API/APIEndpoint/Auth/auth";
import { validateEmail, validatePassword } from "../src/helper/Validation";
import { assets } from "../assets/asset";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
export default function Login({ setIsNewUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handlePress = async () => {
    try {
      console.log("Login pressed");
      if (!validateEmail(email)) {
        throw new Error("Invalid email format");
      } else if (!validatePassword(password)) {
        throw new Error("Invalid password format");
      } else {
        await setError("");
        await getLogin(email, password);
      }
    } catch (error) {
      // console.error("Login error:", error.message);
      setError(error.message || "An error occurred during login");
    }
  };
  // useEffect(() => {
  //   if (error) alert(error);
  // }, [error]);

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
          <KeyboardAvoidingView className="flex-1 ">
            <View className="flex rounded-t-[50px] -mt-[50px] z-50 w-full gap-4 p-[30px] shadow-2xs bg-white">
              <View>
                <Text className="font-semibold text-base">
                  Enter your email:
                </Text>
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
            </View>
            {/* <assets.login height={250} /> */}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
