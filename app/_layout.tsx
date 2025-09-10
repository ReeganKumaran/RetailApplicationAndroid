import { Stack, Redirect, useSegments } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import React from "react";
import "../global.css";
import { getToken } from "../src/API/Auth/token";

export default function Layout() {
  const segments: string[] | undefined = useSegments();
  const [loading, setLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const token = await getToken();
        if (!isMounted) return;
        setIsLoggedIn(!!token);
      } catch (e) {
        if (!isMounted) return;
        setIsLoggedIn(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const inAuthGroup = segments?.[0] === "(auth)";
  const atRootIndex = (segments?.length ?? 0) === 0;

  if (loading) {
    return null; // or a splash component
  }
  console.log(isLoggedIn, inAuthGroup);
  if (!isLoggedIn && !inAuthGroup) {
    console.log("Login screen");
    return <Redirect href="/Login" />;
  }
  if (isLoggedIn && inAuthGroup) {
    return <Redirect href="/Dashboard" />;
  }
  if (isLoggedIn && atRootIndex) {
    return <Redirect href="/Dashboard" />;
  }

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
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
        //     colors={["#2e2d2dff", "#000000"]} // use 6-digit hex (no alpha)
        //     start={{ x: 0, y: 0 }}
        //     end={{ x: 1, y: 1 }}
        //     style={StyleSheet.absoluteFill} // fill the entire header area
        //   />
        // ),
      }}
    ></Stack>
  );
}
