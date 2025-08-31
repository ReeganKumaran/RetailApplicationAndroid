import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  return (
    <GestureHandlerRootView className="flex-1 ">
      <SafeAreaProvider>
        <KeyboardAvoidingView className="flex-1 ">
          <SafeAreaView className="flex-1 ">
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
