import api from "./api";
export const getRental = async ({customerId, option, limit = 10, page = 1 }) => {
  try {
    const response = await api.get("/rentals", {
      params: {
        customerId,
        rentalStatus: option,
        limit,
        page,
      },
    });
    // console.log("response getAPI:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Error fetching clients:", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};
// export const getRentalsByCustomerId = async (customerId) => {
//   try {
//     const response = await api.get("/rentals", {
//       params: {
//         id: customerId,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return error.response?.data || error.message;
//   }
// };

export const getCustomers = async ({ search } = {}) => {
  try {
    const response = await api.get("/customers", {
      params: {
        search: search || undefined,
        // rentalStatus
      }
    });
    // console.log("response getCustomers:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Error fetching customers:", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};
export const generateInvoicePDF = async (rentalIds, token) => {
    try {
        // Convert array to comma-separated string for query params
        const rentalIdsParam = rentalIds.join(',');

        const response = await api.get("/generate-invoice-pdf", {
            params: {
                rentalIds: rentalIdsParam,
                token: token || undefined,
            },
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
export const previewInvoicePDF = async (rentalIds) => {
    try {
        // Convert array to comma-separated string for query params
        const rentalIdsParam = rentalIds.join(',');

        const response = await api.get("/preview-invoice", {
            params: {
                rentalIds: rentalIdsParam,
            },
            headers: {
                Accept: "text/html",
            },
            responseType: "text"
        });

        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        console.error("Invoice preview error:", error);
        return {
            error: error.response?.data || "Failed to preview invoice",
            status: error.response?.status || 500,
            success: false
        };
    }
}
