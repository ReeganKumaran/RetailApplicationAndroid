import api from "./api";

export const postRental = async (payload) => {
    try {
        console.log("postRental API called with payload:", JSON.stringify(payload, null, 2));
        const response = await api.post("/rentals", payload);
        console.log("postRental API success response:", response.data);
        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        console.error("postRental API error:", error.response?.data || error.message);
        console.error("Error status:", error.response?.status);
        return {
            error: error.response?.data || "An error occurred",
            status: error.response?.status || 500,
            success: false
        };
    }
}

export const updateRental = async (customerId, payload) => {
    try {
        console.log("updateRental API called with customerId:", customerId);
        console.log("updateRental API payload:", JSON.stringify(payload, null, 2));
        const response = await api.patch(`/rentals?customerId=${customerId}`, payload);
        console.log("updateRental API success response:", response.data);
        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        console.error("updateRental API error:", error.response?.data || error.message);
        console.error("Error status:", error.response?.status);
        return {
            error: error.response?.data || "An error occurred",
            status: error.response?.status || 500,
            success: false
        };
    }
}