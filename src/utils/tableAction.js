// src/utils/globalMethods.js
import { notification } from 'ant-design-vue';

export function addRow(reference) {
    reference.items.push({ ru: '', uzlat: '', uzCl: '', status: 'ACTIVE' });
    notification.success({
        message: `Yangi qator qo'shildi !`,
        duration: 1
    });
}

export function removeRow(reference, index) {
    reference.items.splice(index, 1);
    notification.warn({
        message: `${index + 1}-qator o'chirildi !`,
        duration: 1
    });
}
