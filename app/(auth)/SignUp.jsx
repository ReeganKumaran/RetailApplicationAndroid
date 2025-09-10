import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { assets } from "../../assets/asset";
import { getSignUp, verifyOTP } from "../../src/API/Auth/auth";
import { validateEmail, validatePassword } from "../../src/helper/Validation";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [otpVerify, setOtpVerify] = useState(false);
  const [submit, setSubmit] = useState(false);
  const handleChanges = (key, data) => {
    const value = key === "email" ? data.trim().toLowerCase() : data;
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const handlePress = async () => {
    if (!submit)
      if (!otpVerify) {
        try {
          setSubmit(true);
          if (!validateEmail(form.email))
            throw new Error("Invalid email format");
          else if (!validatePassword(form.password))
            throw new Error("Invalid password format");
          else {
            await setError("");
            const res = await getSignUp(form);
            if ((res.success = true)) {
              setOtpVerify(true);
              setSubmit(false);
            }
            return res;
          }
        } catch (error) {
          setError(error.message || "An error occurred during sign up");
          setSubmit(false);
        }
      } else {
        try {
          setSubmit(true);
          if (!validateEmail(form.email))
            throw new Error("Invalid email format");
          if (!form.otp)
            throw new Error("OTP required ")
          // else if (!validatePassword(form.password))
          //   throw new Error("Invalid password format");
          else {
            console.log(form);
            await setError("");
            const res = await verifyOTP(form.email, form.otp);
            if (res.success == true) {
              setSubmit(false);
              router.push("../(screen)/Dashboard");
            }
            return res;
          }
        } catch (error) {
          setSubmit(false);
          setError(error.message || "OTP invaild");
        }
      }
  };
  useEffect(() => {
    console.log(error, form);
  }, [error]);
  return (
    <GestureHandlerRootView className="flex-1 ">
      <SafeAreaProvider>
        <KeyboardAvoidingView className="flex-1 ">
          <SafeAreaView className="flex-1 ">
            <LinearGradient
              className="h-[300px] w-full items-center justify-center "
              colors={["#2e2e2e", "#000000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image
                className="-mt-10"
                source={assets.logoLight}
                style={{ height: 100, width: 100 }}
                resizeMode="contain"
              />
            </LinearGradient>
            <ScrollView
              className="flex rounded-t-[50px] -mt-[50px] z-50 w-full gap-4 p-[30px] shadow-2xs bg-white h-[200px]"
              contentContainerStyle={{ gap: 12, flexGrow: 1 }}
              // keyboardShouldPersistTaps="handled"
            >
              {!otpVerify && (
                <>
                  <Text className="font-semibold text-base">
                    Enter your Name:
                  </Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 "
                    placeholder="Enter Name"
                    placeholderTextColor="#aaa"
                    onChangeText={(text) => handleChanges("name", text)}
                    value={form.name}
                    keyboardType="name"
                    autoCapitalize="none"
                  />
                </>
              )}
              <Text className="font-semibold text-base">Enter your email:</Text>
              <TextInput
                className="bg-[#eee] border border-[#ccc] rounded-xl p-4"
                placeholder="Enter email"
                placeholderTextColor="#aaa"
                onChangeText={(text) =>
                  !otpVerify && handleChanges("email", text)
                }
                value={form.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {!otpVerify && (
                <>
                  <Text className="font-semibold text-base">
                    Enter your Password:
                  </Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 "
                    placeholder="Enter password"
                    placeholderTextColor="#aaa"
                    onChangeText={(text) => handleChanges("password", text)}
                    value={form.password}
                    secureTextEntry
                  />
                </>
              )}
              {otpVerify && (
                <>
                  <Text className="font-semibold text-base">
                    Enter your OTP:
                  </Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 "
                    placeholder="Enter OTP"
                    placeholderTextColor="#aaa"
                    onChangeText={(text) => handleChanges("otp", text)}
                    value={form.otp}
                    secureTextEntry
                  />
                </>
              )}
              <Text className="text-center">
                {"Already have an account? "}
                <Text
                  className="font-black"
                  onPress={() => router.push("./Login")}
                >
                  Login
                </Text>
              </Text>
              {error ? <Text className="text-red-500">{error}</Text> : null}
              <TouchableOpacity
                onPress={handlePress}
                className="mt-4 p-5 rounded-lg bg-black items-center justify-center active:opacity-80"
              >
                <Text className="text-white font-semibold">Login</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
