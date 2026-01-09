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

export const updateRental = async (customerId, payload) => {
    try {
        const response = await api.patch(`/rentals?customerId=${customerId}`, payload);
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

export const postItem = async (payload) => {
    try {
        const response = await api.post("/items", payload);
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

export const updateItem = async (itemId, payload) => {
    try {
        const response = await api.patch(`/items/${itemId}`, payload);
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

