import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DatePicker from "./DatePicker";

export default function AdvanceDetails() {
  const [formData, setFormData] = useState({
    customer: "",
    phoneNumber: "",
    email: "",
    aadhar: "",
    note: "",
    itemDetail: {
      name: "",
      size: "",
      price: "",
      quantity: "",
      advanceAmount: "",
    },
    deliveryDate: "",
    returnDate: "",
    deliveryAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      landmark: "",
      isPrimary: true,
    },
    customerDetail: {
      customerName: "",
      customerAadhar: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        landmark: "",
        isPrimary: true,
      },
    },
  });

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Business/Client Information Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            📋 Business Information
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Business Name <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
              placeholder="Enter Business Name"
              placeholderTextColor="#999"
              autoCapitalize="words"
              returnKeyType="next"
              value={formData.customer}
              onChangeText={(text) =>
                setFormData({ ...formData, customer: text })
              }
            />
          </View>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Phone Number <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
              placeholder="Enter Phone Number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              returnKeyType="next"
              value={formData.phoneNumber}
              onChangeText={(text) =>
                setFormData({ ...formData, phoneNumber: text })
              }
            />
          </View>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Email
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
              placeholder="Enter Email Address"
              placeholderTextColor="#999"
              keyboardType="email-address"
              returnKeyType="next"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Aadhar Number
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
              placeholder="Enter Aadhar Number"
              placeholderTextColor="#999"
              returnKeyType="next"
              value={formData.aadhar}
              onChangeText={(text) =>
                setFormData({ ...formData, aadhar: text })
              }
            />
          </View>
        </View>

        {/* Item Details Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            📝 Item Details
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
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
          <View className="flex-row gap-4">
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Size <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="Size"
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
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
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
          <View className="flex-row gap-4 mt-4">
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Price (₹) <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="Enter Price"
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
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Advance Amount (₹) <Text className="text-red-500">*</Text>
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
                    itemDetail: { ...formData.itemDetail, advanceAmount: parseInt(text) || 0 },
                  })
                }
              />
            </View>
          </View>
        </View>

        {/* Dates Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            📅 Rental Period
          </Text>
          <View className="flex-row gap-4">
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
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
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
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

        {/* Delivery Address Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            📦 Delivery Address
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
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
            <View className="bg-white rounded-xl p-4 shadow-sm flex-2">
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
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
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
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
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
            <View className="bg-white rounded-xl p-4 shadow-sm flex-2">
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
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Landmark
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
              placeholder="Nearby Landmark"
              placeholderTextColor="#999"
              returnKeyType="next"
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

        {/* Customer Details Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            👤 Customer Information
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Customer Name
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
              placeholder="Enter Customer Full Name"
              placeholderTextColor="#999"
              autoCapitalize="words"
              returnKeyType="next"
              value={formData.customerDetail.customerName}
              onChangeText={(text) =>
                setFormData({
                  ...formData,
                  customerDetail: {
                    ...formData.customerDetail,
                    customerName: text,
                  },
                })
              }
            />
          </View>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Aadhar Number
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
              placeholder="Enter Customer Aadhar Number"
              placeholderTextColor="#999"
              returnKeyType="next"
              value={formData.customerDetail.customerAadhar}
              onChangeText={(text) =>
                setFormData({
                  ...formData,
                  customerDetail: {
                    ...formData.customerDetail,
                    customerAadhar: text,
                  },
                })
              }
            />
          </View>
          <View className="flex-row gap-4">
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Phone Number
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="Phone Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                returnKeyType="next"
                value={formData.customerDetail.customerPhone}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    customerDetail: {
                      ...formData.customerDetail,
                      customerPhone: text,
                    },
                  })
                }
              />
            </View>
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Email Address
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="Email Address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                returnKeyType="next"
                value={formData.customerDetail.customerEmail}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    customerDetail: {
                      ...formData.customerDetail,
                      customerEmail: text,
                    },
                  })
                }
              />
            </View>
          </View>
        </View>

        {/* Customer Address Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
            🏠 Customer Address
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Street Address
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
              placeholder="Enter Customer Street Address"
              placeholderTextColor="#999"
              returnKeyType="next"
              value={formData.customerDetail.customerAddress.street}
              onChangeText={(text) =>
                setFormData({
                  ...formData,
                  customerDetail: {
                    ...formData.customerDetail,
                    customerAddress: {
                      ...formData.customerDetail.customerAddress,
                      street: text,
                    },
                  },
                })
              }
            />
          </View>
          <View className="flex-row gap-4 mb-4">
            <View className="bg-white rounded-xl p-4 shadow-sm flex-2">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                City
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="City"
                placeholderTextColor="#999"
                returnKeyType="next"
                value={formData.customerDetail.customerAddress.city}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    customerDetail: {
                      ...formData.customerDetail,
                      customerAddress: {
                        ...formData.customerDetail.customerAddress,
                        city: text,
                      },
                    },
                  })
                }
              />
            </View>
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                State
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="State"
                placeholderTextColor="#999"
                returnKeyType="next"
                value={formData.customerDetail.customerAddress.state}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    customerDetail: {
                      ...formData.customerDetail,
                      customerAddress: {
                        ...formData.customerDetail.customerAddress,
                        state: text,
                      },
                    },
                  })
                }
              />
            </View>
          </View>
          <View className="flex-row gap-4 mb-4">
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                PIN Code
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="PIN Code"
                placeholderTextColor="#999"
                keyboardType="numeric"
                returnKeyType="next"
                value={formData.customerDetail.customerAddress.postalCode}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    customerDetail: {
                      ...formData.customerDetail,
                      customerAddress: {
                        ...formData.customerDetail.customerAddress,
                        postalCode: text,
                      },
                    },
                  })
                }
              />
            </View>
            <View className="bg-white rounded-xl p-4 shadow-sm flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Country
              </Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="Country"
                placeholderTextColor="#999"
                returnKeyType="next"
                value={formData.customerDetail.customerAddress.country}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    customerDetail: {
                      ...formData.customerDetail,
                      customerAddress: {
                        ...formData.customerDetail.customerAddress,
                        country: text,
                      },
                    },
                  })
                }
              />
            </View>
          </View>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Landmark
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
              placeholder="Nearby Landmark"
              placeholderTextColor="#999"
              returnKeyType="done"
              value={formData.customerDetail.customerAddress.landmark}
              onChangeText={(text) =>
                setFormData({
                  ...formData,
                  customerDetail: {
                    ...formData.customerDetail,
                    customerAddress: {
                      ...formData.customerDetail.customerAddress,
                      landmark: text,
                    },
                  },
                })
              }
            />
          </View>
          <View className="bg-white rounded-xl p-4 shadow-sm mt-4">
            <Text className="font-semibold text-base text-gray-700 mb-2">
              Special Instructions
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black min-h-20"
              placeholder="Enter Special Instructions or Notes"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              returnKeyType="next"
              value={formData.note}
              onChangeText={(text) => setFormData({ ...formData, note: text })}
            />
          </View>
        </View>
        <TouchableOpacity>
          <View className="px-2 py-3 mt-10 bg-black rounded-xl flex flex-row justify-center">
            <Text className="text-white font-bold text-lg">Submet</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
