import api from "./api"
export const postRental = async(payload) => {
    
    try {
       const responce = await api.post("/rentals", payload)

    } catch (error) {
        
    }
}