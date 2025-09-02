import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
export default function Index() {

  return (
    <View className="flex-1 justify-end p-5">
      <TouchableOpacity
       onPress={() => router.push("./(auth)/Login")}
        className="h-12 px-6 rounded-xl mb-12 bg-black items-center justify-center self-stretch"
      >
        <Text className="text-white text-base font-semibold">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
