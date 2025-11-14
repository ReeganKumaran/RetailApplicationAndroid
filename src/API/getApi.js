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
