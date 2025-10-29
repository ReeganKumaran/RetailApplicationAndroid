import api from "./api";

export const postRental = async (payload) => {
    try {
        const response = await api.post("/rentals", payload);
        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        return {
            error: error.response?.data || "An error occurred",
            status: error.response?.status || 500,
            success: false
        };
    }
}