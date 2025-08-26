import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import Login from "./Login";
import SignIn from "./SignIn";
import { useState } from "react";

export default function Auth() {
  const [isNewUser, setIsNewUser] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <TouchableOpacity onPress={() => setToggle(!toggle)}>
        <Text>{toggle ? "Switch to Login" : "Switch to Sign In"}</Text>
      </TouchableOpacity> */}
      {isNewUser ? <SignIn setIsNewUser={setIsNewUser} /> : <Login setIsNewUser={setIsNewUser} />}
    </SafeAreaView>
  );
}
