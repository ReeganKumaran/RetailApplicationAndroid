import { Ionicons } from "@expo/vector-icons";
import { PlatformPressable } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../../global.css";

const TabBarIcon = ({ name, color, size = 22 }) => (
  <Ionicons name={name} size={size} color={color} />
);

export default function Layout() {
  const insets = useSafeAreaInsets();
  const TabButton = (props) => (
    <PlatformPressable
      {...props}
      android_ripple={{ borderless: false, radius: 40 }}
      style={[props.style, { borderRadius: 50 }]}
      pressOpacity={0.2}
    />
  );
  return (
    <Tabs
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0f0f0f",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          minHeight: 56,
          // paddingTop: 6,
          paddingBottom: Math.max(12, insets.bottom),
          borderTopColor: "#e5e7eb",
          backgroundColor: "#ffffff",
        },
        tabBarItemStyle: { borderRadius: 40 },
        tabBarButton: (props) => <TabButton {...props} />,
        safeAreaInsets: { bottom: insets.bottom },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Rentals"
        options={{
          title: "Customers",
          tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
        }}
      />
      {/* Center action like YouTube create button */}
      <Tabs.Screen
        name="AddClient"
        initialParams={{ editMode: false }}
        options={{
          title: "",
          tabBarIcon: () => (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: "#111827",
                alignItems: "center",
                justifyContent: "center",
                marginTop: -10,
              }}
            >
              <TabBarIcon name="add" size={32} color="#ffffff" />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="Inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="stats-chart" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "You",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="RentalDetails"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />

      <Tabs.Screen
        name="CustomerRentals"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />

      <Tabs.Screen
        name="EditRental"
        options={{
          href: null, // This hides it from the tab bar
        }}
      />
    </Tabs>
  );
}
