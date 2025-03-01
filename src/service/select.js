import axios from "../axios/axios";


export const apiService = {
    async getFuelTypes() {
        try {
            const response = await axios.get("references/def/fuel_type" + localStorage.getItem('lang'));
            return response.data;
        } catch (error) {
            console.error('Failed to fetch fuel types:', error);
            return [];
        }
    },
    async getSpareTypes() {
        try {
            const response = await axios.get("references/def/spare_types" + localStorage.getItem('lang'));
            return response.data;
        } catch (error) {
            console.error('Failed to fetch fuel types:', error);
            return [];
        }
    }
};