import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "./APIEndpoint/APIEndpoint";

const api = axios.create({
  baseURL: baseURL(), // Change to your backend URL if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token"); // get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
  return config;
});

export default api;
