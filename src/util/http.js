import axios from "axios";
var instance = axios.create({
    baseURL: '/api',
    timeout: 5000
});
export default instance;
