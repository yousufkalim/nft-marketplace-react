import axios from "axios";


const ApiCall = axios.create({
    baseURL: 'https://nftdepot-api.azurewebsites.net',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },


});
export default ApiCall


