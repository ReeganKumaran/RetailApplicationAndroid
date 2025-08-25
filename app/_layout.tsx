import { Stack } from "expo-router";
import "../global.css"
export default function Layout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000ff" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: "#f5f5f5" },
      }}
    >
      {/* Only declare screens that actually exist as files */}
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="Login" options={{ title: "Login" }} />
    </Stack>
  );
}
