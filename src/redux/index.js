import { combineReducers } from "redux";
import { AuthReducer, fetchCatagories, getSingleNFT, collectionPage, cataCode } from './AuthReducers'

const Reducers = combineReducers({
    authReducer: AuthReducer,
    api: fetchCatagories,
    singleNFT: getSingleNFT,
    collection: collectionPage,
    code: cataCode
}
)
export default Reducers