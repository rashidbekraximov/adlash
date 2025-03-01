import {apiService} from "../service/select";
import { deleteFunctions } from '../service/delete';
import {globalListFunctions} from "../service/list";
import {saveApiService} from "../service/save";
import {addRow, removeRow} from "../utils/tableAction";

export default {
    install(app) {
        app.config.globalProperties.$addRow = addRow;
        app.config.globalProperties.$removeRow = removeRow;
        app.config.globalProperties.$api = apiService;
        app.config.globalProperties.$delet = deleteFunctions;
        app.config.globalProperties.$api = globalListFunctions;
        app.config.globalProperties.$save = saveApiService;
    }
};