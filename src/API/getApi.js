import api from "./api";
export const getClients = () => {
  try {
    const response = api.get("./clients");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
