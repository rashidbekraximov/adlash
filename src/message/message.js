import {notification} from "ant-design-vue";
import Swal from "sweetalert2";


export function message(status,text) {
    if (status === 'success'){
        notification.success({
            message: text,
            duration: 2
        });
    }else if (status === 'warn'){
        notification.warn({
            message: text,
            duration: 2
        });
    }else{
        notification.error({
            message: text,
            duration: 2
        });
    }
}

export function checkPermission(r) {
    if (r.response.status === 403){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ruxsat etilmagan hudud !"
        }).then((r) => {
            if (r.isConfirmed){
                // router.go(-1);
            }
        });
    }else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: r.response.data.message
        })
    }
}

export function checkPermissionSave(r) {
    if (r.response.status === 403){
        notification.warn({
            message: "Ruxsat etilmagan !",
            duration: 2
        });
    }else {
        notification.warn({
            message: r.response.data.message,
            duration: 2
        });
    }
}

export default message;