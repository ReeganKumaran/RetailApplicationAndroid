import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import "../../global.css";

export default function Layout() {
  return (
    <Stack
      initialRouteName="Dashboard"
      screenOptions={{
        
        headerShadowVisible: false,
        headerTintColor: "#000000ff",
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: "#ffffffff" }, // page background

        // let the gradient show through
        // headerStyle: { backgroundColor: "transparent" },
        // headerTransparent: true,
        // 👇 add the gradient here
        // headerBackground: "#2e2d2d",
      }}
    >
      <Stack.Screen name="Dashboard" options={{ title: "Dashboard" }} />
    </Stack>
  );
}
