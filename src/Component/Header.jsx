import { View, Text } from "react-native";
import React from "react";

export default function Header({ title }) {
  return (
    <View className="w-full flex flex-row justify-center py-5">
      <Text className="text-xl font-bold ">

      {title}
      </Text>
    </View>
  );
}
