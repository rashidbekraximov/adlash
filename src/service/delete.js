// src/services/globalFunctions.js
import Swal from 'sweetalert2';
import { notification } from 'ant-design-vue';
import axios from "../axios/axios"; // Assuming you're using ant-design-vue for notifications

export const deleteFunctions = {
    async deleteRow(URL, getList) {
        try {
            const result = await Swal.fire({
                title: 'Ishonchingiz komilmi?',
                text: "Iltimos, tekshiring va tasdiqlang",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Bekor qilish',
                confirmButtonText: 'Ha, o\'chirish!'
            });

            if (result.isConfirmed) {
                const res = await axios.delete(URL);
                if (res.status === 200) {
                    notification.success({
                        message: `Muvaffaqiyatli o'chirildi!`,
                        duration: 2
                    });
                    if (getList) {
                        getList();
                    }
                } else {
                    notification.error({
                        message: `Xatolik yuzaga keldi!`,
                        duration: 2
                    });
                }
            }
        } catch (error) {
            notification.error({
                message: `Xatolik yuzaga keldi!`,
                duration: 2
            });
        }
    }
};
