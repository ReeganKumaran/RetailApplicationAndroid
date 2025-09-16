import axios from "axios";
import { router } from "expo-router";
import { baseURL } from "./APIEndpoint/APIEndpoint";
import { getToken, removeToken } from "./Auth/token";

const api = axios.create({
  baseURL: baseURL(), // Change to your backend URL if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
  return config;
});

// Add response interceptor to handle expired/invalid token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    console.log('Error status:', status)
    if (status === 401 || status === 403) {
      try {
        await removeToken();
      } catch {}
      try {
        router.replace("/(auth)/Login");
      } catch {}
    }
    return Promise.reject(error);
  }
);

export default api;
