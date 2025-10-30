import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Platform,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { postRental } from "../API/postApi";
import { validateRentalForm } from "../helper/Validation";
import DatePicker from "./DatePicker";

export default function BasicDetails({
  customerData,
  disableCustomerInformation = false,
}) {
  console.log("customerData In basicDetails:", customerData.customerName);
  const initialFormState = {
    customer: customerData.customerName || "",
    phoneNumber: customerData.phoneNumber || "",
    email: customerData.email || "",
    aadhar: customerData.aadhar || "",
    itemDetail: {
      name: "",
      size: "",
      price: "",
      quantity: "",
      advanceAmount: "",
    },
    deliveryDate: "",
    returnDate: "",
    notes: "",
    deliveryAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      landmark: "",
      isPrimary: true,
    },
  };

  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormState);

  const validateForm = () => {
    const { isValid, errors: newErrors } = validateRentalForm(
      formData,
      showDeliveryAddress
    );
    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: showDeliveryAddress ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showDeliveryAddress]);

  const toggleTranslateX = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 24],
  });

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    } else {
      Alert.alert("Notice", message);
    }
  };

  const handleSubmission = async () => {
    // if (!validateForm()) {
    //   showToast('Please fill in all required fields correctly');
    //   return;
    // }

    try {
      const res = await postRental(formData);
      if (res.success) {
        showToast("Rental added successfully! 📦");
        // Reset form data to initial state
        setFormData(initialFormState);
        // Reset delivery address toggle
        setShowDeliveryAddress(false);
        // Clear any existing errors
        setErrors({});
      } else {
        showToast(res.error || "Failed to add rental");
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Customer Information Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            👤 Customer Information
          </Text>
          <View className="bg-white rounded-xl p-4  mb-4">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Customer Name <Text className="text-red-500">*</Text>
            </Text>
            <Pressable
              onPress={() => {
                showToast(
                  "Customer information cannot be edited for existing customers"
                );
              }}
            >
              <View pointerEvents="none">
                <TextInput
                  className={`bg-gray-50 border ${errors.customer ? "border-red-500" : "border-gray-200"} rounded-lg p-3 ${disableCustomerInformation ? "bg-gray-100" : ""} text-black`}
                  placeholder="Enter Customer Name"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  returnKeyType="next"
                  value={formData.customer}
                  editable={!disableCustomerInformation}
                  onChangeText={(text) => {
                    if (!disableCustomerInformation) {
                      setFormData({ ...formData, customer: text });
                      if (errors.customer) {
                        setErrors({ ...errors, customer: '' });
                      }
                    }
                  }}
                />
              </View>
            </Pressable>
            {errors.customer && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.customer}
              </Text>
            )}
          </View>
          <View className="flex-row gap-4">
            <View className="bg-white rounded-xl p-4  flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Phone Number <Text className="text-red-500">*</Text>
              </Text>
              <Pressable
                onPress={() => {
                  showToast(
                    "Customer information cannot be edited for existing customers"
                  );
                }}
              >
                <View pointerEvents="none">
                  <TextInput
                    className={`bg-gray-50 border border-gray-200 rounded-lg p-3 ${disableCustomerInformation ? "bg-gray-100" : ""} text-black`}
                    placeholder="Phone"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    value={formData.phoneNumber}
                    editable={!disableCustomerInformation}
                    onChangeText={(text) => {
                      if (!disableCustomerInformation) {
                        setFormData({ ...formData, phoneNumber: text });
                      }
                    }}
                  />
                </View>
              </Pressable>
            </View>
            <View className="bg-white rounded-xl p-4  flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Email
              </Text>
              <Pressable
                onPress={() => {
                  showToast(
                    "Customer information cannot be edited for existing customers"
                  );
                }}
              >
                <View pointerEvents="none">
                  <TextInput
                    className={`bg-gray-50 border border-gray-200 rounded-lg p-3 ${disableCustomerInformation ? "bg-gray-100" : ""} text-black`}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    returnKeyType="next"
                    value={formData.email}
                    editable={!disableCustomerInformation}
                    onChangeText={(text) => {
                      if (!disableCustomerInformation) {
                        setFormData({ ...formData, email: text });
                      }
                    }}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Item Details Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            📝 Item Details
          </Text>
          <View className="bg-white rounded-xl p-4  mb-4">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Item Name <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
              placeholder="Enter Item Name"
              placeholderTextColor="#999"
              autoCapitalize="words"
              returnKeyType="next"
              value={formData.itemDetail.name}
              onChangeText={(text) =>
                setFormData({
                  ...formData,
                  itemDetail: { ...formData.itemDetail, name: text },
                })
              }
            />
          </View>
          <View className="flex-row gap-4 mb-4">
            <View className="bg-white rounded-xl p-4  flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Price (₹) <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="Price"
                placeholderTextColor="#999"
                keyboardType="numeric"
                returnKeyType="next"
                value={formData.itemDetail.price}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    itemDetail: { ...formData.itemDetail, price: text },
                  })
                }
              />
            </View>
            <View className="bg-white rounded-xl p-4  flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Quantity <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="Qty"
                placeholderTextColor="#999"
                keyboardType="numeric"
                returnKeyType="next"
                value={formData.itemDetail.quantity}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    itemDetail: { ...formData.itemDetail, quantity: text },
                  })
                }
              />
            </View>
          </View>
          <View className="bg-white flex-row rounded-xl p-4 gap-10">
            <View className="flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Size <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="Enter Size"
                placeholderTextColor="#999"
                returnKeyType="next"
                value={formData.itemDetail.size}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    itemDetail: { ...formData.itemDetail, size: text },
                  })
                }
              />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Advance Amount <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="Enter Amount"
                placeholderTextColor="#999"
                returnKeyType="next"
                keyboardType="numeric"
                value={formData.itemDetail.advanceAmount?.toString() || ""}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    itemDetail: {
                      ...formData.itemDetail,
                      advanceAmount: parseInt(text) || 0,
                    },
                  })
                }
              />
            </View>
          </View>
        </View>

        {/* Rental Period Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            📅 Rental Period
          </Text>
          <View className="flex-row gap-4">
            <View className="bg-white rounded-xl p-4  flex-1">
              <DatePicker
                value={formData.deliveryDate}
                onDateChange={(date) =>
                  setFormData({ ...formData, deliveryDate: date })
                }
                label="Delivery Date"
                required={true}
                placeholder="Select Delivery Date"
              />
            </View>
            <View className="bg-white rounded-xl p-4  flex-1">
              <DatePicker
                value={formData.returnDate}
                onDateChange={(date) =>
                  setFormData({ ...formData, returnDate: date })
                }
                label="Return Date"
                required={false}
                placeholder="Select Return Date"
              />
            </View>
          </View>
        </View>

        {/* Notes Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            📝 Notes
          </Text>
          <View className="bg-white rounded-xl p-4 ">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Special Instructions
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black min-h-20"
              placeholder="Enter special instructions or notes"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              returnKeyType="next"
              value={formData.notes}
              onChangeText={(text) => setFormData({ ...formData, notes: text })}
            />
          </View>
        </View>

        {/* Delivery Address Toggle Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between bg-white rounded-xl p-4  mb-4">
            <View className="flex-row items-center">
              <Text className="text-lg mr-2">📦</Text>
              <Text className="font-semibold text-base text-gray-700">
                Delivery Address
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowDeliveryAddress(!showDeliveryAddress)}
              className={`w-14 h-7 rounded-full p-1 ${
                showDeliveryAddress ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <Animated.View
                className="w-5 h-5 rounded-full bg-white flex items-center justify-center"
                style={{
                  transform: [{ translateX: toggleTranslateX }],
                }}
              >
                <View className="w-2 h-2 rounded-full bg-gray-400" />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {showDeliveryAddress && (
            <View>
              <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                📦 Delivery Address
              </Text>
              <View className="bg-white rounded-xl p-4  mb-4">
                <Text className="font-semibold text-base text-gray-700 mb-2">
                  Street Address
                </Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                  placeholder="Enter Street Address"
                  placeholderTextColor="#999"
                  returnKeyType="next"
                  value={formData.deliveryAddress.street}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      deliveryAddress: {
                        ...formData.deliveryAddress,
                        street: text,
                      },
                    })
                  }
                />
              </View>
              <View className="flex-row gap-4 mb-4">
                <View className="bg-white rounded-xl p-4  flex-2">
                  <Text className="font-semibold text-base text-gray-700 mb-2">
                    City
                  </Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                    placeholder="City"
                    placeholderTextColor="#999"
                    returnKeyType="next"
                    value={formData.deliveryAddress.city}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        deliveryAddress: {
                          ...formData.deliveryAddress,
                          city: text,
                        },
                      })
                    }
                  />
                </View>
                <View className="bg-white rounded-xl p-4  flex-1">
                  <Text className="font-semibold text-base text-gray-700 mb-2">
                    State
                  </Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                    placeholder="State"
                    placeholderTextColor="#999"
                    returnKeyType="next"
                    value={formData.deliveryAddress.state}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        deliveryAddress: {
                          ...formData.deliveryAddress,
                          state: text,
                        },
                      })
                    }
                  />
                </View>
              </View>
              <View className="flex-row gap-4 mb-4">
                <View className="bg-white rounded-xl p-4  flex-1">
                  <Text className="font-semibold text-base text-gray-700 mb-2">
                    PIN Code
                  </Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                    placeholder="PIN Code"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    returnKeyType="next"
                    value={formData.deliveryAddress.postalCode}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        deliveryAddress: {
                          ...formData.deliveryAddress,
                          postalCode: text,
                        },
                      })
                    }
                  />
                </View>
                <View className="bg-white rounded-xl p-4  flex-2">
                  <Text className="font-semibold text-base text-gray-700 mb-2">
                    Country
                  </Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                    placeholder="Country"
                    placeholderTextColor="#999"
                    returnKeyType="next"
                    value={formData.deliveryAddress.country}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        deliveryAddress: {
                          ...formData.deliveryAddress,
                          country: text,
                        },
                      })
                    }
                  />
                </View>
              </View>
              <View className="bg-white rounded-xl p-4 ">
                <Text className="font-semibold text-base text-gray-700 mb-2">
                  Landmark
                </Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                  placeholder="Nearby Landmark"
                  placeholderTextColor="#999"
                  returnKeyType="done"
                  value={formData.deliveryAddress.landmark}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      deliveryAddress: {
                        ...formData.deliveryAddress,
                        landmark: text,
                      },
                    })
                  }
                />
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              handleSubmission();
            }}
          >
            <View className="px-2 py-3 mt-10 bg-black rounded-xl flex flex-row justify-center">
              <Text className="text-white font-bold text-lg">Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
