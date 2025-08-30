import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  const onLogin = () => {
    // TODO: call your API -> navigate on success
    // navigation.replace("Home");
    console.log({ email, pw });
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <LinearGradient
        colors={["#2e2e2eff", "#000000ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.brand}>SRK</Text>
      </LinearGradient>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Log In</Text>

        {/* Email */}
        <View style={styles.inputWrap}>
          <Ionicons name="mail-outline" size={18} color="#6B7280" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrap}>
          <Ionicons name="lock-closed-outline" size={18} color="#6B7280" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPw}
            value={pw}
            onChangeText={setPw}
          />
          <Pressable onPress={() => setShowPw((s) => !s)}>
            <Ionicons
              name={showPw ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#6B7280"
            />
          </Pressable>
        </View>

        {/* Login button */}
        <Pressable style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>

        {/* Links */}
        <Pressable onPress={() => navigation?.navigate?.("Forgot")}>
          <Text style={styles.linkSm}>Forgot password?</Text>
        </Pressable>

        <View style={{ height: 28 }} />
        <Text style={styles.muted}>Don’t have an account?</Text>
        <Pressable onPress={() => navigation?.navigate?.("SignUp")}>
          <Text style={styles.link}>Sign up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const CARD_RADIUS = 22;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F3F6FA" },
  header: {
    height: 210,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  brand: { color: "#fff", fontSize: 36, fontWeight: "800", letterSpacing: 2 },
  card: {
    marginHorizontal: 18,
    marginTop: -40,
    backgroundColor: "#fff",
    borderRadius: CARD_RADIUS,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 14,
    color: "#111827",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 12,
  },
  input: { flex: 1, color: "#111827" },
  button: {
    backgroundColor: "#000000ff",
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  linkSm: {
    color: "#000000ff",
    textAlign: "center",
    marginTop: 10,
    fontSize: 13,
  },
  muted: { color: "#6B7280", textAlign: "center" },
  link: { color: "#000000ff", textAlign: "center", fontWeight: "700", marginTop: 4 },
});
