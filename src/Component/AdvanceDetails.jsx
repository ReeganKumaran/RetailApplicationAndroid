import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

export default function AdvanceDetails() {
  return (
    <View>
      <View style={{ flex: 1, gap: 16 }}>
        <View>
          <Text className="font-semibold text-base">Client Name:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Client Name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Client Phone Number:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Phone Number"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            returnKeyType="next"
          />
        </View>
        {/* <View>
                  <Text className="font-semibold text-base">Site Address:</Text>
                  <TextInput
                    className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
                    placeholder="Enter Address"
                    placeholderTextColor="#aaa"
                    returnKeyType="next"
                  />
                </View> */}
        <View>
          <Text className="font-semibold text-base">Item Name:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Item Name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Quantity:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Quantity"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Size:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Size"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Rate:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Client Name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Delivery Date:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Delivery Date"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Return Date:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Return Date"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Advance:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Advance Amount"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Customer Name:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Customer Name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Customer Address:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Customer Address"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Customer Aadhar:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Client Name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">
            Customer Phone Number:
          </Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Customer Phone Number"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Site Name:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Site Name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Site Phone Number:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Phone Number"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        <View>
          <Text className="font-semibold text-base">Site Landmark:</Text>
          <TextInput
            className="bg-[#eee] border border-[#ccc] rounded-xl p-4 text-black"
            placeholder="Enter Site Landmark"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>
        {/* ...repeat your other fields... */}
      </View>
    </View>
  );
}
