import api from "../api"
export const getClients = async() => {
    try {
       const responce = await api.get("./clients")

    } catch (error) {
        
    }
}