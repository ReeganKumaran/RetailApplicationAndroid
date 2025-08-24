import { Text, Touchable, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { router } from "expo-router";

export default class index extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent:"flex-end" }}>
        <TouchableOpacity onPress={()=>router.push("./Login")}   style={{
          height: 48,
          paddingHorizontal: 24,
          borderRadius: 10,
          marginBottom:50,
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch", // full-width; remove if you want compact
        }}>
          <Text style={{color:"white"}}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
