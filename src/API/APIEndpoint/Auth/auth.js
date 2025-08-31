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
    throw new Error (error.response?.data?.message || "Login failed");
  }
};

export const getSignUp = async ({name, email, password}) => {
  try {
    const response = await api.post("/signup", {
      username: name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error (error.message || "Sign Up error");
  }
};
