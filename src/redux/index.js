import { combineReducers } from "redux";
import { AuthReducer, fetchCatagories, getSingleNFT, collectionPage, cataCode, fetchCatagoriestitle } from './AuthReducers'

const Reducers = combineReducers({
    authReducer: AuthReducer,
    api: fetchCatagories,
    singleNFT: getSingleNFT,
    collection: collectionPage,
    code: cataCode,
    apii: fetchCatagoriestitle,
}
)
export default Reducers