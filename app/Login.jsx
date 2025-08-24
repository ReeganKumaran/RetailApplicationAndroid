import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from "react";
import { router } from "expo-router";

StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center", // centers vertically
    alignItems: "center", // centers horizontally
    // backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    color: "#000000f3",
    textAlign: "center", // center the text inside itself
    backgroundColor: "rgba(255,255,255,0.1)", // semi-transparent bg
    padding: 10, // spacing around text
    borderRadius: 8, // rounded corners
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlePress = () => {
    // alert("Button Pressed!");
    router.push("./")
};
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#353535" }}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{ padding: 16, gap: 12 }}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
                Enter your email:
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#444",
                  borderRadius: 8,
                  padding: 12,
                  color: "#fff",
                }}
                placeholder="Enter email"
                placeholderTextColor="#aaa"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={{ color: "#fff", fontSize: 16 }}>
                Enter your Password:
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#444",
                  borderRadius: 8,
                  padding: 12,
                  color: "#fff",
                }}
                placeholder="Enter password"
                placeholderTextColor="#aaa"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
              />

              {/* Button */}
              <TouchableOpacity
                onPress={handlePress}
                style={{
                  marginTop: 16,
                  height: 48,
                  borderRadius: 10,
                  backgroundColor: "#5A8DEE",
                  alignItems: "center", // <-- use alignItems, not alignContent
                  justifyContent: "center",
                }}
                activeOpacity={0.8}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Submit</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
