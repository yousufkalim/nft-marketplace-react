import axios from "axios";

const ApiCall = axios.create({
    baseURL: 'https://nftdepot-api.azurewebsites.net',


});
export default ApiCall


