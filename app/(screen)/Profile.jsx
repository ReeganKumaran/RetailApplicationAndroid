import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { removeToken } from "../../src/API/Auth/token";
import { router } from "expo-router";

export default function Profile() {
  return (
    <SafeAreaProvider className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-start items-end p-4">
          <TouchableOpacity
            onPress={() => {
              removeToken();
              router.push("/Login")
              // return <Redirect href="/Login" />
            }}
          >
            <Text className="text-red-500 font-bold">Log out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
