import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.push("/(screen)/Dashboard");
    }, 500);
  }, []);
  return (
    <View className="flex-1 justify-end p-5">
      <TouchableOpacity
        onPress={() => router.push("/Login")}
        className="h-12 px-6 rounded-xl mb-12 bg-black items-center justify-center self-stretch"
      >
        <Text className="text-white text-base font-semibold">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
