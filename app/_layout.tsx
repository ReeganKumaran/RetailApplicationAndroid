import { Stack } from "expo-router";
import "../global.css"
// import { useEffect, useState } from "react";
export default function Layout() {
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //   setTimeout(() => {
    //     SplashScreen.hideAsync();
    //     setLoading(false);
    //   }, 2000); // 2 seconds
    // }, []);
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffffff" },
        headerTintColor: "#000000ff",
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: "#ffffffff" },
      }}
    >
      {/* Only declare screens that actually exist as files */}
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="Login" options={{ title: "Login" }} />
    </Stack>
  );
}
