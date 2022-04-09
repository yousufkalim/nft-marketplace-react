import { ContentType } from './contentType'
import axios from '../api/instance'
import { toast } from 'react-toastify';



export const getSingleNFT = (id) => async (dispatch) => {
    const response = await axios.get(`nfts/${id}`)
    console.log(response)
    dispatch({ type: ContentType.GET_SINGLE_NFT, payload: response.data.body.nft })
}
export const getCatagory = () => async (dispatch) => {
    const response = await axios.get('/collections/category/Art');

    dispatch({ type: ContentType.GET_CATAGORY, payload: response.data })
}
export const getInfo = () => async (dispatch) => {
    const response = await axios.get('/me', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')} ,`
        }
    });

    dispatch({ type: ContentType.GET_INFO, payload: response.data })
}

export const Login = (user) => {
    toast.dark('Successfull Login')
    return {
        type: ContentType.LOGIN,
        payload: user
    }

}
export const Logout = (user) => {

    return {

        type: ContentType.LOGOUT,
        payload: user
    }
}
export const Signup = (user) => {
    toast.dark('Successful Signup')
    return {
        type: ContentType.ACCOUT_INIALIZED,
        payload: user
    }
}