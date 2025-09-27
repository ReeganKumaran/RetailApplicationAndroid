import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import "../../global.css";

export default function Layout() {
  return (
    <Stack
      initialRouteName="Login"
      screenOptions={{
        
        headerShadowVisible: false,
        headerTintColor: "#ffffffff",
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: "#fff" }, // page background

        // let the gradient show through
        headerStyle: { backgroundColor: "transparent" },
        headerTransparent: true,
        // 👇 add the gradient here
        // headerBackground: () => (
        //   <LinearGradient
        //     colors={["#2e2d2dff",f "#000000"]} // use 6-digit hex (no alpha)
        //     start={{ x: 0, y: 0 }}
        //     end={{ x: 1, y: 1 }}
        //     style={StyleSheet.absoluteFill} // fill the entire header area
        //   />
        // ),
      }}
    >
      <Stack.Screen name="Login" options={{ title: "Login" }} />
      <Stack.Screen name="ForgotPassword" options={{ title: "Forgot Password" }} />
      <Stack.Screen name="ResetPassword" options={{ title: "Reset Password" }} />
    </Stack>
  );
}
