import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  Edit,
  EllipsisVertical,
  IndianRupee,
  Scroll,
} from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import {
  Animated,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  Easing,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { WebView } from 'react-native-webview';
import { cacheDirectory, downloadAsync } from 'expo-file-system/legacy';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getRental } from "../../src/API/getApi";
import { baseURL } from "../../src/API/APIEndpoint/APIEndpoint";
import { getToken } from "../../src/API/Auth/token";
import SegmentedToggle from "../../src/Component/SegmentedToggle";
import { formatDate, getStatusColor } from "../../src/utils/Formater";
import { hide } from "expo-splash-screen";
import { RentalListSkeleton } from "../../src/Component/SkeletonLoaders";

export default function CustomerRentals() {
  const params = useLocalSearchParams();
  const [rentals, setRentals] = useState([]);
  const [allRentals, setAllRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedRentals, setSelectedRentals] = useState([]);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [downloading, setDownloading] = useState(false);
  const customerId = params.customerId;
  const customerName = params.customerName;

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const menuOpacity = useRef(new Animated.Value(0)).current;
  const menuScale = useRef(new Animated.Value(0.96)).current;
  const menuY = useRef(new Animated.Value(-8)).current;

  const animateIn = () => {
    setShowMenu(true);
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 240,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
      Animated.timing(menuOpacity, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(menuScale, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(menuY, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  };

  const animateOut = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad),
      }),
      Animated.timing(menuOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
      Animated.timing(menuScale, {
        toValue: 0.96,
        duration: 220,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
      Animated.timing(menuY, {
        toValue: -8,
        duration: 220,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
    ]).start(({ finished }) => finished && setShowMenu(false));
  };

  const toggleMenu = () => (showMenu ? animateOut() : animateIn());

  const customerData = params.customerData
    ? JSON.parse(params.customerData)
    : null;

  const fetchCustomerRentals = async ({ option }) => {
    try {
      setLoading(true);
      const response = await getRental({
        option,
        customerId,
        limit: null,
        page: null,
      });

      // Filter rentals for this specific customer
      const customerRentals =
        response.data?.rentals?.filter((rental) => {
          return (
            rental.customerId === customerId ||
            rental.customer === customerName ||
            rental.customerDetail?.customerName === customerName
          );
        }) || [];

      setAllRentals(customerRentals);
      setRentals(customerRentals); // Initially show all rentals
    } catch (error) {
      console.error("Error fetching customer rentals:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        await fetchCustomerRentals({});
      };
      loadData();
    }, [customerId])
  );

  const filterRentals = async (status) => {
    if (status === "All") fetchCustomerRentals({ option: null });
    else await fetchCustomerRentals({ option: status });
  };

  // Handle long press to enter selection mode
  const handleLongPress = (rental) => {
    setSelectionMode(true);
    setSelectedRentals([rental._id]);
  };

  // Handle tap in selection mode
  const handleSelectToggle = (rentalId) => {
    if (selectedRentals.includes(rentalId)) {
      const newSelection = selectedRentals.filter((id) => id !== rentalId);
      setSelectedRentals(newSelection);

      // Exit selection mode if no items selected
      if (newSelection.length === 0) {
        setSelectionMode(false);
      }
    } else {
      setSelectedRentals([...selectedRentals, rentalId]);
    }
  };

  // Handle normal press
  const handlePress = (rental) => {
    if (selectionMode) {
      handleSelectToggle(rental._id);
    } else {
      router.push({
        pathname: "/(screen)/RentalDetails",
        params: {
          data: encodeURIComponent(JSON.stringify(rental)),
        },
      });
    }
  };

  // Cancel selection mode
  const cancelSelection = () => {
    setSelectionMode(false);
    setSelectedRentals([]);
  };

  // Generate Invoice PDF
  const handleGenerateInvoice = async () => {
    if (selectedRentals.length === 0) {
      Alert.alert("No Rentals Selected", "Please select at least one rental to generate invoice");
      return;
    }

    try {
      console.log("Generating invoice for rental IDs:", selectedRentals);

      // Get auth token
      const token = await getToken();

      // Build the PDF URL with query params using dynamic baseURL
      const apiBaseUrl = baseURL();
      const rentalIdsParam = selectedRentals.join(',');
      const url = `${apiBaseUrl}/generate-invoice-pdf?rentalIds=${rentalIdsParam}&token=${token}`;

      console.log("PDF URL:", url);

      // Show PDF in modal
      setPdfUrl(url);
      setShowPDFModal(true);
    } catch (error) {
      console.error("Invoice generation error:", error);
      Alert.alert("Error", "Failed to open invoice. Please try again.");
    }
  };

  // Download PDF to device
  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);

      // Get token for authorization
      const token = await getToken();

      // Download the PDF with Authorization header
      const filename = `invoice_${Date.now()}.pdf`;
      const fileUri = `${cacheDirectory}${filename}`;

      const downloadResult = await downloadAsync(pdfUrl, fileUri, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Downloaded to:", downloadResult.uri);

      // Use Sharing API to let user save the file
      // This works on all Android versions without MediaLibrary issues
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(downloadResult.uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Save Invoice',
          UTI: 'com.adobe.pdf'
        });
      }

      Alert.alert("Success", "Invoice ready to save!");
      setDownloading(false);

      // Close modal and clear selection
      setShowPDFModal(false);
      setSelectionMode(false);
      setSelectedRentals([]);
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "Failed to download invoice: " + error.message);
      setDownloading(false);
    }
  };

  // Close PDF modal
  const closePDFModal = () => {
    setShowPDFModal(false);
    setPdfUrl("");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white ">
        <View
          className="flex-row items-center justify-between p-4 border-b border-gray-200 z-50"
          style={{
            position: "relative",
            backgroundColor: selectionMode ? "#b9b9b9ff" : "white",
          }}
        >
          {selectionMode ? (
            // Selection Mode Header
            <>
              <View className="flex-row items-center flex-1">
                <Pressable onPress={cancelSelection}>
                  <Ionicons name="close" size={24} color="#383838ff" />
                </Pressable>
                <Text className="text-xl font-bold ml-4 text-[#383838ff]">
                  {selectedRentals.length} selected
                </Text>
              </View>

              <View className="flex-row gap-4">
                <Pressable onPress={handleGenerateInvoice} hitSlop={12}>
                  <FontAwesome6 name="file-invoice" size={23} color="black" />
                </Pressable>
                <Pressable onPress={toggleMenu} hitSlop={12}>
                  <EllipsisVertical color="#383838ff" size={24} />
                </Pressable>
              </View>
            </>
          ) : (
            // Normal Header
            <>
              <View className="flex-row items-center flex-1">
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text className="text-xl font-bold ml-4">
                  {customerName} - Rentals
                </Text>
              </View>

              <Pressable className="mr-3" onPress={toggleMenu} hitSlop={12}>
                <EllipsisVertical color="#000" size={24} />
              </Pressable>
            </>
          )}

          {/* Backdrop only while visible */}
          {showMenu && (
            <Animated.View
              // covers the header area to catch outside taps
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "transparent",
                opacity: backdropOpacity,
              }}
            >
              <Pressable style={{ flex: 1 }} onPress={animateOut} />
            </Animated.View>
          )}

          {/* Animated menu */}
          {showMenu && (
            <Animated.View
              style={{
                position: "absolute",
                top: 48, // drop under the header row
                right: 8,
                opacity: menuOpacity,
                transform: [{ translateY: menuY }, { scale: menuScale }],
                backgroundColor: "#fff",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                overflow: "hidden",
                elevation: 10, // Android shadow
                shadowColor: "#000", // iOS shadow
                shadowOpacity: 0.15,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                zIndex: 60,
                minWidth: 180,
              }}
            >
              {[
                {
                  label: "Create Invoice",
                  onPress: () => {
                    /* do something */
                  },
                },
                {
                  label: "Export as CSV",
                  onPress: () => {
                    /* ... */
                  },
                },
                {
                  label: "Delete Selected",
                  onPress: () => {
                    /* ... */
                  },
                },
              ].map((item, i) => (
                <Pressable
                  key={i}
                  onPress={() => {
                    animateOut();
                    item.onPress();
                  }}
                  android_ripple={{ color: "#e5e7eb" }}
                  style={{ paddingVertical: 12, paddingHorizontal: 16 }}
                >
                  <Text style={{ color: "#111827" }}>{item.label}</Text>
                </Pressable>
              ))}
            </Animated.View>
          )}
        </View>
        {/* Customer Summary Card */}

        <ScrollView className="flex-1 px-4 py-4">
          {customerData && (
            <View className="my-4 bg-gray-950 rounded-lg p-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-lg font-bold mb-2">
                  Customer Summary
                </Text>
                <Pressable
                  className="bg-blue-500 rounded-full px-4 py-2"
                  onPress={() => {
                    router.push({
                      pathname: "/(screen)/AddClient",
                      params: {
                        customerId: customerId,
                        customerName: customerName,
                        customerData: params.customerData,
                        disableEdit: false,
                      },
                    });
                  }}
                >
                  <Text className="text-white">Add Rental</Text>
                </Pressable>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">Total Rentals:</Text>
                <Text className="text-white font-medium">
                  {allRentals.length}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">Total Revenue:</Text>
                <Text className="text-white font-medium">
                  ₹
                  {allRentals.reduce(
                    (sum, rental) =>
                      sum +
                      (rental.totalRent || rental.itemDetail?.totalPrice || 0),
                    0
                  )}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">Pending:</Text>
                <Text className="text-yellow-400 font-medium">
                  {allRentals.filter((r) => r.retalStatus === "Pending").length}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Returned:</Text>
                <Text className="text-green-400 font-medium">
                  {
                    allRentals.filter((r) => r.retalStatus === "Returned")
                      .length
                  }
                </Text>
              </View>
            </View>
          )}
          <View className="mb-4 mx-3">
            <SegmentedToggle
              options={["All", "Pending", "Returned"]}
              onChange={(selectedOption) => {
                filterRentals(selectedOption);
              }}
            />
          </View>
          {loading ? (
            <RentalListSkeleton count={4} />
          ) : rentals.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-500 text-lg">
                No rentals found for this customer
              </Text>
            </View>
          ) : (
            <View>
              {rentals.map((rental, idx) => {
                const isSelected = selectedRentals.includes(rental._id);
                return (
                  <Pressable
                    key={idx}
                    onPress={() => handlePress(rental)}
                    onLongPress={() => handleLongPress(rental)}
                    className={`rounded-lg p-4 mb-4 active:opacity-80 ${
                      isSelected ? "bg-gray-600" : "bg-gray-950"
                    }`}
                    style={{
                      borderWidth: isSelected ? 2 : 0,
                      borderColor: isSelected ? "#525252ff" : "transparent",
                    }}
                  >
                    {/* Header with Item Name and Price */}
                    <View className="flex-row justify-between items-center mb-3">
                      {selectionMode && (
                        <View
                          className={`w-6 h-6 rounded-full mr-3 items-center justify-center ${
                            isSelected ? "bg-white" : "border-2 border-white"
                          }`}
                        >
                          {isSelected && (
                            <Ionicons
                              name="checkmark"
                              size={18}
                              color="#b9b9b9ff"
                            />
                          )}
                        </View>
                      )}
                      <Text className="text-white text-lg font-bold flex-1">
                        {rental.itemDetail?.name || rental.name || "Item"}
                      </Text>
                      <View className="flex-row items-center">
                        <IndianRupee color="#ffffff" size={16} />
                        <Text className="text-white text-lg font-bold ml-1">
                          {rental.itemDetail?.totalPrice ||
                            rental.totalRent ||
                            0}
                        </Text>
                      </View>
                    </View>

                    {/* Item Details */}
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-gray-400">Size & Quantity:</Text>
                      <Text className="text-white">
                        {rental.itemDetail?.size || rental.size} ×{" "}
                        {rental.itemDetail?.quantity || rental.quantity}
                      </Text>
                    </View>

                    {/* Dates */}
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-gray-400">Delivery:</Text>
                      <Text className="text-white">
                        {formatDate(rental.deliveryDate)}
                      </Text>
                    </View>

                    {rental.returnDate && (
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-400">Return:</Text>
                        <Text className="text-white">
                          {formatDate(rental.returnDate)}
                        </Text>
                      </View>
                    )}

                    {/* Status and Duration */}
                    <View className="flex-row justify-between items-center">
                      <View
                        className={`px-3 py-1 rounded-full ${getStatusColor(rental.rentalStatus)}`}
                      >
                        <Text className="text-white text-xs font-medium">
                          {rental.rentalStatus || "Unknown"}
                        </Text>
                      </View>
                      <Text className="text-gray-400">
                        {rental.totalDays || 1} days
                      </Text>
                    </View>

                    {/* Advance Payment Info */}
                    {rental.itemDetail?.advanceAmount > 0 && (
                      <View className="mt-2 pt-2 border-t border-gray-700">
                        <View className="flex-row justify-between">
                          <Text className="text-green-400 text-sm">
                            Advance Paid: ₹{rental.itemDetail.advanceAmount}
                          </Text>
                          <Text className="text-orange-400 text-sm">
                            Remaining: ₹
                            {(rental.itemDetail.totalPrice ||
                              rental.totalRent) -
                              rental.itemDetail.advanceAmount}
                          </Text>
                        </View>
                      </View>
                    )}

                    {/* Notes */}
                    {rental.notes && (
                      <View className="mt-2 pt-2 border-t border-gray-700">
                        <Text className="text-gray-400 text-sm italic">
                          {rental.notes}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          )}
        </ScrollView>

        {/* PDF Viewer Modal */}
        <Modal
          visible={showPDFModal}
          animationType="slide"
          onRequestClose={closePDFModal}
        >
          <SafeAreaView className="flex-1 bg-white">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200 bg-white">
              <Pressable onPress={closePDFModal} hitSlop={12}>
                <Ionicons name="close" size={28} color="black" />
              </Pressable>
              <Text className="text-lg font-bold">Invoice Preview</Text>
              <TouchableOpacity
                onPress={handleDownloadPDF}
                disabled={downloading}
                className="bg-black px-4 py-2 rounded-lg"
              >
                {downloading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text className="text-white font-semibold">Download</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* PDF WebView */}
            <WebView
              source={{ uri: pdfUrl }}
              style={{ flex: 1 }}
              startInLoadingState={true}
              renderLoading={() => (
                <View className="flex-1 items-center justify-center">
                  <ActivityIndicator size="large" color="#000" />
                  <Text className="mt-4">Loading invoice...</Text>
                </View>
              )}
            />
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
