import { SafeAreaView } from "react-native";
import Login from "./Login";
import SignIn from "./SignIn";
import { useState } from "react";

export default function Auth() {
  const [toggle, setToggle] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {toggle ? <SignIn /> : <Login />}
    </SafeAreaView>
  );
}
