import { ContentType } from './contentType'


const intialValues = {
    user: null,
    isLoginIn: false,
    isInitializzed: false,
    token: ''

}

export const AuthReducer = (state = intialValues, { type, payload }) => {

    switch (type) {
        case ContentType.ACCOUT_INIALIZED:
            return {
                ...state,
                ...payload,
                isInitializzed: true,
            }
        case ContentType.LOGIN:
            return {
                ...state,
                ...payload,
                isLoginIn: true,
            }
        case ContentType.LOGOUT:
            return {
                isLoginIn: false,
                user: null
            }
        case ContentType.GET_INFO:
            return { ...state, ...payload.body }

        default:
            return state
    }

}

export const fetchCatagories = (state = [], { type, payload }) => {

    switch (type) {
        case ContentType.GET_CATAGORY:
            return { ...state, payload }

        default:
            return state
    }

}


export const getSingleNFT = (state = {}, { type, payload }) => {

    switch (type) {
        case ContentType.GET_SINGLE_NFT:
            return { ...state, ...payload }
        case ContentType.REMOVE_NFT:
            return null
        default:
            return state
    }

}
export const collectionPage = (state = [], { type, payload }) => {

    switch (type) {
        case ContentType.GET_COLLECTION_PAGE:
            return { ...state, collectionpage: payload }
        case ContentType.REMOVE_NFT:
            return {}
        default:
            return state
    }

}
export const cataCode = (state = [], { type, payload }) => {

    switch (type) {
        case ContentType.GET_CODE_CATA:
            return { ...state, cata: payload }
        default:
            return state
    }

}