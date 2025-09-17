import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function SegmentedToggle({
  options = ["All", "Active", "Completed"],
  initial = "All",
  onChange,
}) {
  const [value, setValue] = useState(initial);

  return (
    <View className="flex-row items-center bg-gray-200 rounded-full justify-around p-1">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <Pressable
            key={opt}
            onPress={() => {
              setValue(opt);
              if (onChange) onChange(opt);
            }}
            className={`px-4 py-2  rounded-full ${options.length === 2 ? "w-1/2" : "w-1/3"}  ${
              selected ? "bg-black/80" : "bg-transparent"
            }`}
            android_ripple={{ color: "#e5e7eb", borderless: false }}
          >
            <Text
              className={`text-sm text-center ${
                selected ? "text-white font-semibold" : "text-gray-700"
              }`}
            >
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
