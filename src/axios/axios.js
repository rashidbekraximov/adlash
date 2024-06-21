import axios from "axios";
import {API_URL} from "@/constant";

const http = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        accept: "*/*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
        expires: "0",
        "cache-control": "no-cache,no-store,max-age=0,must-revalidate",
        pragma: "no-cache",
    }
});

export default http;