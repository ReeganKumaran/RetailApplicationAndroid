import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";

export default function DatePicker({
  value,
  onDateChange,
  placeholder = "Select Date",
  label,
  required = false
}) {
  const [showPicker, setShowPicker] = useState(false);

  // Generate years, months, days
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10}, (_, i) => currentYear + i);
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from({length: getDaysInMonth(selectedYear, selectedMonth)}, (_, i) => i + 1);

  const formatDate = (year, month, day) => {
    // Format as YYYY-MM-DD for backend compatibility
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const displayDate = (dateString) => {
    if (!dateString) return placeholder;
    // Display format DD/MM/YYYY for user
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const handleDateSelect = () => {
    const formattedDate = formatDate(selectedYear, selectedMonth, selectedDay);
    onDateChange(formattedDate);
    setShowPicker(false);
  };

  const openPicker = () => {
    // Initialize with current value if exists
    if (value) {
      const date = new Date(value);
      setSelectedYear(date.getFullYear());
      setSelectedMonth(date.getMonth() + 1);
      setSelectedDay(date.getDate());
    }
    setShowPicker(true);
  };

  return (
    <View>
      {label && (
        <Text className="font-semibold text-base text-gray-700 mb-2">
          {label} {required && <Text className="text-red-500">*</Text>}
        </Text>
      )}

      <TouchableOpacity
        onPress={openPicker}
        className="bg-gray-50 border border-gray-200 rounded-lg p-3"
      >
        <Text
          className={`text-base ${
            value ? "text-black" : "text-gray-500"
          }`}
        >
          {displayDate(value)}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={showPicker}
        onRequestClose={() => setShowPicker(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 m-4 w-80">
            <Text className="text-lg font-bold text-gray-800 mb-4 text-center">
              Select Date
            </Text>

            {/* Year Selection */}
            <View className="mb-4">
              <Text className="font-semibold text-gray-700 mb-2">Year</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
              >
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    onPress={() => setSelectedYear(year)}
                    className={`px-4 py-2 mx-1 rounded-lg ${
                      selectedYear === year ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    <Text
                      className={`${
                        selectedYear === year ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Month Selection */}
            <View className="mb-4">
              <Text className="font-semibold text-gray-700 mb-2">Month</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
              >
                {months.map((month) => (
                  <TouchableOpacity
                    key={month.value}
                    onPress={() => setSelectedMonth(month.value)}
                    className={`px-3 py-2 mx-1 rounded-lg ${
                      selectedMonth === month.value ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        selectedMonth === month.value ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {month.name.substring(0, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Day Selection */}
            <View className="mb-6">
              <Text className="font-semibold text-gray-700 mb-2">Day</Text>
              <View className="flex-row flex-wrap">
                {days.map((day) => (
                  <TouchableOpacity
                    key={day}
                    onPress={() => setSelectedDay(day)}
                    className={`w-10 h-10 m-1 rounded-lg justify-center items-center ${
                      selectedDay === day ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    <Text
                      className={`${
                        selectedDay === day ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                className="flex-1 py-3 bg-gray-200 rounded-lg"
              >
                <Text className="text-center text-gray-700 font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDateSelect}
                className="flex-1 py-3 bg-blue-500 rounded-lg"
              >
                <Text className="text-center text-white font-semibold">Select</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}