import { Pressable, Text, View } from "react-native";

export default function SegmentedToggle({
  options = ["All", "Active", "Completed"],
  value = "All",
  onChange,
}) {
  return (
    <View className="flex-row items-center bg-gray-200 rounded-full justify-around p-1">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <Pressable
            key={opt}
            onPress={() => {
              if (onChange) onChange(opt);
            }}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 9999,
              width: options.length === 2 ? "50%" : "33.333%",
              backgroundColor: selected ? "rgba(0, 0, 0, 0.8)" : "transparent",
            }}
            android_ripple={{ color: "#e5e7eb", borderless: true }}
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
