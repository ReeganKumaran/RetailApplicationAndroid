import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Package, IndianRupee, Plus, X, Edit } from "lucide-react-native";
import { getItems } from "../../src/API/getApi";
import { postItem, updateItem } from "../../src/API/postApi";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    inventory: {
      totalQuantity: "",
      availableQuantity: "",
    },
    pricing: {
      unitPrice: "",
      currency: "INR",
    },
    dimensions: {
      width: "",
      height: "",
      unit: "ft",
    },
  });

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const loadItems = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getItems();

      if (response?.success) {
        setItems(response.data?.items || []);
      } else {
        setError("Failed to load inventory items");
        setItems([]);
      }
    } catch (err) {
      console.error("Error loading items:", err);
      setError("Unable to load inventory items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

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

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      inventory: {
        totalQuantity: "",
        availableQuantity: "",
      },
      pricing: {
        unitPrice: "",
        currency: "INR",
      },
      dimensions: {
        width: "",
        height: "",
        unit: "ft",
      },
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      inventory: {
        totalQuantity: item.inventory?.totalQuantity?.toString() || "",
        availableQuantity: item.inventory?.availableQuantity?.toString() || "",
      },
      pricing: {
        unitPrice: item.pricing?.unitPrice?.toString() || "",
        currency: item.pricing?.currency || "INR",
      },
      dimensions: {
        width: item.dimensions?.width?.toString() || "",
        height: item.dimensions?.height?.toString() || "",
        unit: item.dimensions?.unit || "ft",
      },
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name.trim()) {
      showToast("Please enter item name");
      return;
    }
    if (!formData.pricing.unitPrice || parseFloat(formData.pricing.unitPrice) <= 0) {
      showToast("Please enter valid unit price");
      return;
    }
    if (!formData.inventory.totalQuantity || parseInt(formData.inventory.totalQuantity) <= 0) {
      showToast("Please enter valid total quantity");
      return;
    }
    if (!formData.inventory.availableQuantity || parseInt(formData.inventory.availableQuantity) < 0) {
      showToast("Please enter valid available quantity");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      inventory: {
        totalQuantity: parseInt(formData.inventory.totalQuantity),
        availableQuantity: parseInt(formData.inventory.availableQuantity),
      },
      pricing: {
        unitPrice: parseFloat(formData.pricing.unitPrice),
        currency: formData.pricing.currency,
      },
      dimensions: {
        width: parseFloat(formData.dimensions.width) || 0,
        height: parseFloat(formData.dimensions.height) || 0,
        unit: formData.dimensions.unit,
      },
    };

    try {
      setSaving(true);
      let response;

      if (editingItem) {
        // Update existing item
        response = await updateItem(editingItem.itemId, payload);
      } else {
        // Create new item
        response = await postItem(payload);
      }

      if (response.success) {
        showToast(editingItem ? "Item updated successfully! ✅" : "Item added successfully! ✅");
        closeModal();
        loadItems(); // Reload the list
      } else {
        const errorMessage = response.error?.message || response.error || "Failed to save item";
        showToast(errorMessage);
      }
    } catch (err) {
      console.error("Error saving item:", err);
      showToast("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">Inventory</Text>
          <Pressable
            onPress={openAddModal}
            className="bg-black rounded-full p-2"
            hitSlop={12}
          >
            <Plus size={24} color="#fff" />
          </Pressable>
        </View>

        {/* Content */}
        <ScrollView className="flex-1 px-4 py-4 ">
          {loading ? (
            <View className="flex-1 justify-center items-center py-20">
              <ActivityIndicator size="large" color="#000" />
              <Text className="text-gray-500 mt-4">Loading items...</Text>
            </View>
          ) : error ? (
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-red-500 text-center">{error}</Text>
              <Pressable
                onPress={loadItems}
                className="mt-4 bg-black px-6 py-3 rounded-lg"
              >
                <Text className="text-white font-semibold">Retry</Text>
              </Pressable>
            </View>
          ) : items.length === 0 ? (
            <View className="flex-1 justify-center items-center py-20">
              <Package size={64} color="#9ca3af" />
              <Text className="text-gray-500 text-lg mt-4">
                No inventory items found
              </Text>
              <Text className="text-gray-400 text-sm mt-2">
                Add your first item to get started
              </Text>
            </View>
          ) : (
            <View className="gap-4 mb-8">
              {items.map((item, idx) => (
                <Pressable
                  key={item._id || idx}
                  onPress={() => openEditModal(item)}
                  className="bg-gray-950 rounded-xl p-4 active:opacity-80"
                >
                  {/* Item Header */}
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center flex-1">
                      <Package size={20} color="#fff" />
                      <Text className="text-white text-lg font-bold ml-2">
                        {item.name}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                      <View className="flex-row items-center">
                        <IndianRupee size={16} color="#fff" />
                        <Text className="text-white text-lg font-bold ml-1">
                          {item.pricing?.unitPrice || 0}
                        </Text>
                        <Text className="text-gray-400 text-sm ml-1">
                          /{item.pricing?.currency || "INR"}
                        </Text>
                      </View>
                      <Pressable
                        onPress={(e) => {
                          e.stopPropagation();
                          openEditModal(item);
                        }}
                        hitSlop={8}
                      >
                        <Edit size={18} color="#9ca3af" />
                      </Pressable>
                    </View>
                  </View>

                  {/* Item Details */}
                  <View className="border-t border-gray-700 pt-3 gap-2">
                    <View className="flex-row justify-between">
                      <Text className="text-gray-400">Total Quantity:</Text>
                      <Text className="text-white font-medium">
                        {item.inventory?.totalQuantity || 0} pcs
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-gray-400">Available:</Text>
                      <Text className="text-green-400 font-medium">
                        {item.inventory?.availableQuantity || 0} pcs
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-gray-400">In Use:</Text>
                      <Text className="text-orange-400 font-medium">
                        {(item.inventory?.totalQuantity || 0) -
                          (item.inventory?.availableQuantity || 0)}{" "}
                        pcs
                      </Text>
                    </View>
                    {item.dimensions && (
                      <View className="flex-row justify-between">
                        <Text className="text-gray-400">Dimensions:</Text>
                        <Text className="text-white">
                          {item.dimensions.width} × {item.dimensions.height}{" "}
                          {item.dimensions.unit}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Stock Status Bar */}
                  <View className="mt-3">
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-gray-400 text-xs">Stock Level</Text>
                      <Text className="text-gray-400 text-xs">
                        {Math.round(
                          ((item.inventory?.availableQuantity || 0) /
                            (item.inventory?.totalQuantity || 1)) *
                            100
                        )}
                        %
                      </Text>
                    </View>
                    <View className="bg-gray-700 h-2 rounded-full overflow-hidden">
                      <View
                        className="bg-green-500 h-full"
                        style={{
                          width: `${
                            ((item.inventory?.availableQuantity || 0) /
                              (item.inventory?.totalQuantity || 1)) *
                            100
                          }%`,
                        }}
                      />
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Add/Edit Modal */}
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <SafeAreaView className="flex-1 bg-gray-50">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-200">
              <Pressable onPress={closeModal} hitSlop={12}>
                <X size={24} color="#000" />
              </Pressable>
              <Text className="text-lg font-bold">
                {editingItem ? "Edit Item" : "Add New Item"}
              </Text>
              <Pressable
                onPress={handleSave}
                disabled={saving}
                hitSlop={12}
              >
                {saving ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <Text className="text-blue-600 font-semibold text-base">
                    Save
                  </Text>
                )}
              </Pressable>
            </View>

            {/* Form */}
            <ScrollView className="flex-1 px-4 py-4">
              {/* Item Name */}
              <View className="mb-4">
                <Text className="text-base font-semibold text-gray-700 mb-2">
                  Item Name <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-white border border-gray-200 rounded-lg p-3 text-black"
                  placeholder="Enter item name"
                  placeholderTextColor="#999"
                  value={formData.name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, name: text })
                  }
                />
              </View>

              {/* Pricing */}
              <View className="mb-4">
                <Text className="text-base font-semibold text-gray-700 mb-2">
                  Unit Price (₹) <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-white border border-gray-200 rounded-lg p-3 text-black"
                  placeholder="Enter price per unit"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={formData.pricing.unitPrice}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, unitPrice: text },
                    })
                  }
                />
              </View>

              {/* Inventory */}
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-700 mb-2">
                    Total Quantity <Text className="text-red-500">*</Text>
                  </Text>
                  <TextInput
                    className="bg-white border border-gray-200 rounded-lg p-3 text-black"
                    placeholder="Total qty"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={formData.inventory.totalQuantity}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        inventory: {
                          ...formData.inventory,
                          totalQuantity: text,
                        },
                      })
                    }
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-700 mb-2">
                    Available <Text className="text-red-500">*</Text>
                  </Text>
                  <TextInput
                    className="bg-white border border-gray-200 rounded-lg p-3 text-black"
                    placeholder="Available"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={formData.inventory.availableQuantity}
                    onChangeText={(text) =>
                      setFormData({
                        ...formData,
                        inventory: {
                          ...formData.inventory,
                          availableQuantity: text,
                        },
                      })
                    }
                  />
                </View>
              </View>

              {/* Dimensions */}
              <View className="mb-4">
                <Text className="text-base font-semibold text-gray-700 mb-2">
                  Dimensions (Optional)
                </Text>
                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <TextInput
                      className="bg-white border border-gray-200 rounded-lg p-3 text-black"
                      placeholder="Width"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      value={formData.dimensions.width}
                      onChangeText={(text) =>
                        setFormData({
                          ...formData,
                          dimensions: { ...formData.dimensions, width: text },
                        })
                      }
                    />
                  </View>
                  <View className="flex-1">
                    <TextInput
                      className="bg-white border border-gray-200 rounded-lg p-3 text-black"
                      placeholder="Height"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      value={formData.dimensions.height}
                      onChangeText={(text) =>
                        setFormData({
                          ...formData,
                          dimensions: { ...formData.dimensions, height: text },
                        })
                      }
                    />
                  </View>
                  <View className="flex-1">
                    <Pressable
                      onPress={() => {
                        Alert.alert(
                          "Select Unit",
                          "",
                          [
                            { text: "cm", onPress: () => setFormData({ ...formData, dimensions: { ...formData.dimensions, unit: "cm" } }) },
                            { text: "m", onPress: () => setFormData({ ...formData, dimensions: { ...formData.dimensions, unit: "m" } }) },
                            { text: "inch", onPress: () => setFormData({ ...formData, dimensions: { ...formData.dimensions, unit: "inch" } }) },
                            { text: "ft", onPress: () => setFormData({ ...formData, dimensions: { ...formData.dimensions, unit: "ft" } }) },
                            { text: "Cancel", style: "cancel" }
                          ]
                        );
                      }}
                      className="bg-white border border-gray-200 rounded-lg p-3"
                    >
                      <Text className={formData.dimensions.unit ? "text-black" : "text-gray-400"}>
                        {formData.dimensions.unit || "Unit"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}