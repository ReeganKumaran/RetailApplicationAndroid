import axios from "axios";
import { baseURL } from "./APIEndpoint/APIEndpoint";

const api = axios.create({
  baseURL: baseURL(), // Change to your backend URL if needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
