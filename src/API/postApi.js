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

export const generateInvoicePDF = async (rentalIds) => {
    try {
        const response = await api.post("/generate-invoice-pdf", {
            rentalIds
        }, {
            responseType: 'blob' // Important for PDF download
        });

        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        console.error("Invoice generation error:", error);
        return {
            error: error.response?.data || "Failed to generate invoice",
            status: error.response?.status || 500,
            success: false
        };
    }
}