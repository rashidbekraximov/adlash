import { notification } from 'ant-design-vue';
import axios from "../axios/axios";
import message from "../message/message";
import validator from "../validation/validator";

export const saveApiService = {
    async saveAllData(url, data, refresh) {
        const valid = validator();
        if (valid) {
            try {
                const response = await axios.post(url, data);
                handleApiResponse(response, "Muvaffaqiyatli saqlandi", "Xato yuzaga keldi!", refresh);
            } catch (error) {
                console.error('Error in saveData:', error);
                this.checkPermissionSave(error);
            }
        }else {
            message("warn","Ma'lumotlar to'liq kiritilmagan !");
        }
    }
};

export function handleApiResponse(response, successMessage, errorMessage,refresh) {
    if (response.status === 201) {
        notification.success({
            message: successMessage,
            duration: 2
        });
        if (refresh){
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    } else {
        notification.error({
            message: errorMessage,
            duration: 1
        });
    }
}