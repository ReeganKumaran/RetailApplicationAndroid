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
            className={`px-4 py-2  rounded-full ${`w-1/${options.length}`}  ${
              selected ? "bg-blue-200" : "bg-transparent"
            }`}
            android_ripple={{ color: "#e5e7eb", borderless: false }}
          >
            <Text
              className={`text-sm text-center ${
                selected ? "text-blue-600 font-semibold" : "text-gray-700"
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
