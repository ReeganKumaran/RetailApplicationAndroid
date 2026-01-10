import { router, useFocusEffect } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { getItems } from "../API/getApi";
import { postRental, updateRental } from "../API/postApi";
import { validateRentalForm } from "../helper/Validation";
import DatePicker from "./DatePicker";
export default function BasicDetails({
  customerData,
  rentalData,
  disableCustomerInformation = false,
  isEditMode = false,
}) {
  // Use rentalData if available (edit mode), otherwise use customerData
  const dataSource = rentalData || customerData;

  const initialFormState = useMemo(
    () => ({
      customer: dataSource?.customer || dataSource?.customerName || "",
      phoneNumber:
        dataSource?.clientPhoneNumber ||
        dataSource?.phoneNumber ||
        dataSource?.customerDetail?.customerPhone ||
        "",
      email:
        dataSource?.clientEmail ||
        dataSource?.email ||
        dataSource?.customerDetail?.customerEmail ||
        "",
      aadhar:
        dataSource?.clientAadhaar ||
        dataSource?.aadhar ||
        dataSource?.customerDetail?.customerAadhar ||
        "",
      itemDetail: {
        itemId: dataSource?.itemDetail?.itemId || "",
        name: dataSource?.itemDetail?.name || "",
        size: dataSource?.itemDetail?.size || "",
        price: dataSource?.itemDetail?.price?.toString() || "",
        quantity: dataSource?.itemDetail?.quantity?.toString() || "",
        advanceAmount: dataSource?.itemDetail?.advanceAmount?.toString() || "",
      },
      deliveredDate: dataSource?.deliveredDate || "",
      returnDate: dataSource?.returnDate || "",
      notes: dataSource?.notes || "",
      deliveryAddress: {
        street: dataSource?.deliveryAddress?.street || "",
        city: dataSource?.deliveryAddress?.city || "",
        state: dataSource?.deliveryAddress?.state || "",
        postalCode: dataSource?.deliveryAddress?.postalCode || "",
        country: dataSource?.deliveryAddress?.country || "",
        landmark: dataSource?.deliveryAddress?.landmark || "",
        isPrimary: dataSource?.deliveryAddress?.isPrimary ?? true,
      },
    }),
    [dataSource]
  );

  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormState);
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemSearchQuery, setItemSearchQuery] = useState("");
  const [totalAvailableItems, setTotalAvailableItems] = useState("");
  const lastToastTimeRef = useRef(0);
  // Fetch items on component mount

  useFocusEffect(
    useCallback(() => {
      const fetchItems = async () => {
        try {
          const response = await getItems({ page: 1, limit: null });
          if (response?.data?.items) {
            setItems(response.data.items);
          }
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };
      fetchItems();
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      if (isEditMode) {
        const fetchItems = async () => {
          try {
            const response = await getItems({
              id: rentalData?.itemDetail?.itemId,
            });
            console.log("response for edit mode item fetch:", response);
            if (response?.data?.item) {
              console.log("Fetched item for edit mode:", response.data.item);
              if (response.data?.item?._id === rentalData?.itemDetail?.itemId) {
                setTotalAvailableItems(
                  parseInt(response.data?.item?.inventory.availableQuantity) +
                    parseInt(initialFormState.itemDetail.quantity)
                );
              } else {
                showToast("Item data mismatch. Please check the item details.");
              }
            }
          } catch (error) {
            console.error("Error fetching items:", error);
          }
        };
        fetchItems();
      }
    }, [isEditMode, rentalData?.itemDetail?.itemId])
  );
  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);
  // Reset form when data source or edit mode changes
  useEffect(() => {
    setFormData(initialFormState);
    setErrors({});
    setShowDeliveryAddress(false);
    setSelectedItemId(null);
  }, [initialFormState, isEditMode]);

  useEffect(() => {
    if (!items.length) return;
    if (!formData.itemDetail.name) {
      if (selectedItemId) {
        setSelectedItemId(null);
      }
      return;
    }
    const matchedItem = items.find(
      (item) => item.name === formData.itemDetail.name
    );
    if (matchedItem && matchedItem._id !== selectedItemId) {
      setSelectedItemId(matchedItem._id);
    }
  }, [items, formData.itemDetail.name, selectedItemId]);

  // Filter items based on search
  const filteredItems = items.filter((item) => {
    if (!itemSearchQuery) return true;
    return item.name.toLowerCase().includes(itemSearchQuery.toLowerCase());
  });

  // Handle item selection from dropdown
  const handleItemSelect = (item) => {
    console.log("Item selected:", item);
    setTotalAvailableItems(item.inventory.availableQuantity);
    setSelectedItemId(item._id);
    const updatedFormData = {
      ...formData,
      itemDetail: {
        ...formData.itemDetail,
        itemId: item._id, // Add itemId for backend
        name: item.name,
        price: item.pricing.unitPrice.toString(),
        size: `${item.dimensions.width}x${item.dimensions.height} ${item.dimensions.unit}`,
      },
    };
    console.log("Updated form data:", updatedFormData.itemDetail);
    setFormData(updatedFormData);
    setShowItemModal(false);
    setItemSearchQuery("");
    Keyboard.dismiss();
  };

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
    const now = Date.now();

    // Block if last toast was shown less than 1.5 seconds ago
    if (now - lastToastTimeRef.current < 1500) {
      return;
    }

    lastToastTimeRef.current = now;

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
    if (!validateForm()) {
      showToast("Please fill in all required fields correctly");
      return;
    }

    try {
      let res;

      if (isEditMode && rentalData?._id) {
        res = await updateRental(rentalData._id, formData);
      } else {
        res = await postRental(formData);
      }

      if (res.success) {
        showToast(
          isEditMode
            ? "Rental updated successfully! ✅"
            : "Rental added successfully! 📦"
        );
        router.back();
        if (!isEditMode) {
          setFormData(initialFormState);
          setShowDeliveryAddress(false);
          setErrors({});
        }
      } else {
        const errorMessage =
          res.error?.message ||
          res.error ||
          (isEditMode ? "Failed to update rental" : "Failed to add rental");
        showToast(errorMessage);
      }
    } catch (_error) {
      showToast("An error occurred. Please try again.");
    }
  };

  const renderForm = () => (
    <View className="flex-1 bg-gray-50">
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
            {disableCustomerInformation ? (
              <Pressable
                onPress={() => {
                  showToast(
                    "Customer information cannot be edited for existing customers"
                  );
                }}
              >
                <View pointerEvents="none">
                  <TextInput
                    className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-black"
                    placeholder="Enter Customer Name"
                    placeholderTextColor="#999"
                    value={formData.customer}
                    editable={false}
                  />
                </View>
              </Pressable>
            ) : (
              <TextInput
                className={`bg-gray-50 border ${
                  errors.customer ? "border-red-500" : "border-gray-200"
                } rounded-lg p-3 text-black`}
                placeholder="Enter Customer Name"
                placeholderTextColor="#999"
                autoCapitalize="words"
                returnKeyType="next"
                value={formData.customer}
                onChangeText={(text) => {
                  setFormData({ ...formData, customer: text });
                  if (errors.customer) {
                    setErrors({ ...errors, customer: "" });
                  }
                }}
              />
            )}
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
              {disableCustomerInformation ? (
                <Pressable
                  onPress={() => {
                    showToast(
                      "Customer information cannot be edited for existing customers"
                    );
                  }}
                >
                  <View pointerEvents="none">
                    <TextInput
                      className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-black"
                      placeholder="Phone"
                      placeholderTextColor="#999"
                      value={formData.phoneNumber}
                      editable={false}
                    />
                  </View>
                </Pressable>
              ) : (
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                  placeholder="Phone"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  value={formData.phoneNumber}
                  onChangeText={(text) => {
                    setFormData({ ...formData, phoneNumber: text });
                  }}
                />
              )}
            </View>
            <View className="bg-white rounded-xl p-4  flex-1">
              <Text className="font-semibold text-base text-gray-700 mb-2">
                Email
              </Text>
              {disableCustomerInformation ? (
                <Pressable
                  onPress={() => {
                    showToast(
                      "Customer information cannot be edited for existing customers"
                    );
                  }}
                >
                  <View pointerEvents="none">
                    <TextInput
                      className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-black"
                      placeholder="Email"
                      placeholderTextColor="#999"
                      value={formData.email}
                      editable={false}
                    />
                  </View>
                </Pressable>
              ) : (
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                  placeholder="Email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  returnKeyType="next"
                  value={formData.email}
                  onChangeText={(text) => {
                    setFormData({ ...formData, email: text });
                  }}
                />
              )}
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
            <Pressable
              onPress={() => setShowItemModal(true)}
              style={{
                height: 50,
                borderColor: "#e5e7eb",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 12,
                backgroundColor: "#f9fafb",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: formData.itemDetail.name ? "#111827" : "#9ca3af",
                }}
              >
                {formData.itemDetail.name || "Select item from inventory..."}
              </Text>
            </Pressable>

            {/* Item Selection Modal */}
            <Modal
              visible={showItemModal}
              animationType="slide"
              transparent={false}
              onRequestClose={() => setShowItemModal(false)}
            >
              <View style={{ flex: 1, backgroundColor: "white" }}>
                <View
                  style={{
                    paddingHorizontal: 16,
                    marginTop: 30,
                    borderBottomWidth: 1,
                    borderBottomColor: "#e5e7eb",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setShowItemModal(false)}
                      style={{ marginRight: 12 }}
                    >
                      <Text style={{ fontSize: 18 }}>
                        <ArrowLeft />
                      </Text>
                    </TouchableOpacity>
                    {/* <Text style={{ fontSize: 18, fontWeight: "600" }}>
                      Select Item
                    </Text> */}

                    <TextInput
                      style={{
                        // height: "100%"
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "#e5e7eb",
                        borderRadius: 50,
                        paddingHorizontal: 12,
                        fontSize: 16,
                      }}
                      placeholder="Search items..."
                      value={itemSearchQuery}
                      onChangeText={setItemSearchQuery}
                      autoFocus
                    />
                  </View>
                </View>
                <FlatList
                  data={filteredItems}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        if(item.inventory.availableQuantity === 0){
                          showToast("Selected item is out of stock");
                          return;
                        }
                        handleItemSelect(item);
                      }}
                      style={{
                        padding: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: "#f0f0f0",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          color: "#111827",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}
                      >
                        ₹{item.pricing.unitPrice} • {item.dimensions.width}x
                        {item.dimensions.height} {item.dimensions.unit}
                      </Text>
                      <Text
                        style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}
                      >
                        Available: {item.inventory.availableQuantity}/
                        {item.inventory.totalQuantity}
                      </Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <View style={{ padding: 32, alignItems: "center" }}>
                      <Text style={{ color: "#9ca3af" }}>No items found</Text>
                    </View>
                  }
                />
              </View>
            </Modal>
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
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold text-base text-gray-700 mb-2">
                  Quantity <Text className="text-red-500">*</Text>
                </Text>
                <Text className="font-semibold text-base text-gray-700 mb-2">
                  {totalAvailableItems || "NA"}/
                  {formData.itemDetail.quantity || 0}
                </Text>
              </View>

              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-black"
                placeholder="Qty"
                placeholderTextColor="#999"
                keyboardType="numeric"
                returnKeyType="next"
                value={formData.itemDetail.quantity}
                onChangeText={(text) => {
                  if (Number(text) <= Number(totalAvailableItems)) {
                    setFormData({
                      ...formData,
                      itemDetail: { ...formData.itemDetail, quantity: text },
                    });
                  } else {
                    showToast("Quantity exceeds available items");
                  }
                }}
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
                Advance Amount
                {/* <Text className="text-red-500">*</Text> */}
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
            <View className="bg-white rounded-xl p-4 flex flex-row justify-between  flex-1">
              <DatePicker
                value={formData.deliveredDate}
                onDateChange={(date) =>
                  setFormData({ ...formData, deliveredDate: date })
                }
                label="Delivery Date"
                required={true}
                placeholder="Select Delivery Date"
              />
            </View>
            <View className="bg-white rounded-xl p-2  flex-1">
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

          <TouchableOpacity onPress={handleSubmission}>
            <View className="px-2 py-3 mt-10 bg-black rounded-xl flex flex-row justify-center">
              <Text className="text-white font-bold text-lg">
                {isEditMode ? "Update" : "Submit"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return renderForm();
}
