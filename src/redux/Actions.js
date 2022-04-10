import { ContentType } from './contentType'
import axios from '../api/instance'
import { toast } from 'react-toastify';




export const getCollectionPage = (id) => async (dispatch) => {
    const response = await axios.get(`collections/${id}`)
    try {

        dispatch({ type: ContentType.GET_COLLECTION_PAGE, payload: response.data.body })
    } catch (err) {
        console.log(err.response)
        return err
    }
}

export const getSingleNFT = (id) => async (dispatch) => {
    const response = await axios.get(`nfts/${id}`)
    try {

        dispatch({ type: ContentType.GET_SINGLE_NFT, payload: response.data.body.nft })
    } catch (e) {
        return e
    }
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
export const removeNftpage = () => {
    return ({ type: ContentType.REMOVE_NFT })
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