// src/services/globalFunctions.js
import axios from "../axios/axios";
import {checkPermission} from "../message/message";

export const globalListFunctions = {
    async getDataList(URL) {
        try {
            const response = await axios.get(URL);
            return response.data;
        } catch (reason) {
            checkPermission(reason);
        }
    },
};
