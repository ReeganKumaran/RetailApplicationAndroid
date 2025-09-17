import api from "./api";
export const getRental = async () => {
  try {
    const response = await api.get("/rentals");
    console.log("response getAPI:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};

export const getCustomers = async () => {
  try {
    const response = await api.get("/customers");
    console.log("response getCustomers:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};
