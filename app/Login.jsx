import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from "react";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    router.push("./");
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-[#353535]">
      <SafeAreaProvider>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <SafeAreaView className="flex-1">
            <ScrollView
              contentContainerStyle={{ gap: 12, padding: 16 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* Email */}
              <Text className="text-white text-base">Enter your email:</Text>
              <TextInput
                className="bg-[#444] rounded-lg p-3 text-white"
                placeholder="Enter email"
                placeholderTextColor="#aaa"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password */}
              <Text className="text-white text-base">Enter your Password:</Text>
              <TextInput
                className="bg-[#444] rounded-lg p-3 text-white"
                placeholder="Enter password"
                placeholderTextColor="#aaa"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
              />

              {/* Button */}
              <TouchableOpacity
                onPress={handlePress}
                className="mt-4 h-12 rounded-lg bg-[#5A8DEE] items-center justify-center active:opacity-80"
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
