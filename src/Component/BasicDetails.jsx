import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

export default function BasicDetails() {
  return (
    <View>
      <View style={{ flex: 1, gap: 16 }}>
        <View>
          <Text className="font-semibold text-base">Client Name:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Client Name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>

        <View>
          <Text className="font-semibold text-base">Item Name:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Item Name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View className=" gap-4 pe-4 flex-row ">
          <View className="w-1/2">
            <Text className="font-semibold text-base">Rate:</Text>
            <TextInput
              className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
              placeholder="Enter Rate"
              placeholderTextColor="#aaa"
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>
          <View className="w-1/2">
            <Text className="font-semibold text-base">Advance:</Text>
            <TextInput
              className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
              placeholder="Enter Advance"
              placeholderTextColor="#aaa"
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>
        </View>
        <View className=" gap-4 pe-4 flex-row ">
          <View className="w-1/2">
            <Text className="font-semibold text-base">Quantity:</Text>
            <TextInput
              className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
              placeholder="Enter Quantity"
              placeholderTextColor="#aaa"
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>
          <View className="w-1/2">
            <Text className="font-semibold text-base">Size:</Text>
            <TextInput
              className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
              placeholder="Enter Size"
              placeholderTextColor="#aaa"
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
