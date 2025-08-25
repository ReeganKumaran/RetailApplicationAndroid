import api from "../../api";

// Get Auth Token
export const getAuthToken = async () => {
  try {
    const response = await api.post("/auth/token", {
      username: "user",
      password: "pass",
    });
    return response.data.token;
  } catch (error) {
    console.error("Error fetching auth token:", error);
    throw error;
  }
};

// Login
export const getLogin = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error.response?.data.message || "Login failed";
  }
};
