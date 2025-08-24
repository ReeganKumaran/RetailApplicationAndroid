import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#2a9cffff", // header background color
            },
            headerTintColor: "#fff", // back button & title color
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerTitleAlign: "center", // center the title
            contentStyle: {
              backgroundColor: "#f5f5f5", // page background
            },
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
