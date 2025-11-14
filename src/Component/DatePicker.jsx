import { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CustomDatePicker({
  value,
  onDateChange,
  placeholder = "Select Date & Time",
  label,
  required = false,
  mode = "datetime", // 'date', 'time', 'datetime'
  showTime = true, // Show time in display
}) {
  const [show, setShow] = useState(false);
  const [currentMode, setCurrentMode] = useState("date");
  const [tempDate, setTempDate] = useState(value ? new Date(value) : new Date());

  const displayDate = (dateString) => {
    if (!dateString) return placeholder;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return placeholder;

      if (showTime) {
        // Display with date and time
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      } else {
        // Display only date
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }
    } catch (e) {
      return placeholder;
    }
  };

  const handleChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShow(false);
      setCurrentMode('date');
      return;
    }

    if (event.type === 'set' && selectedDate) {
      setTempDate(selectedDate);

      // On Android with datetime mode, show time picker after date
      if (Platform.OS === 'android' && mode === 'datetime' && currentMode === 'date') {
        setCurrentMode('time');
        // Don't close, show time picker next
        return;
      }

      // Final selection - update value and close
      onDateChange(selectedDate.toISOString());
      setShow(false);
      setCurrentMode('date'); // Reset for next time

      // Close on iOS
      if (Platform.OS === 'ios') {
        setShow(false);
      }
    }
  };

  const handleOpen = () => {
    // Set initial date when opening
    if (value) {
      try {
        const parsedDate = new Date(value);
        if (!isNaN(parsedDate.getTime())) {
          setTempDate(parsedDate);
        }
      } catch (e) {
        console.error("Error parsing date on open:", e);
      }
    }
    setCurrentMode('date'); // Start with date picker
    setShow(true);
  };

  return (
    <View>
      {label && (
        <Text className="font-semibold text-base text-gray-700 mb-2">
          {label} {required && <Text className="text-red-500">*</Text>}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleOpen}
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

      {show && (
        <DateTimePicker
          value={tempDate}
          mode={Platform.OS === 'ios' && mode === 'datetime' ? 'datetime' : currentMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={new Date(2020, 0, 1)}
          maximumDate={new Date(2030, 11, 31)}
        />
      )}
    </View>
  );
}
