import { combineReducers } from "redux";
import { AuthReducer, fetchCatagories, getSingleNFT, collectionPage } from './AuthReducers'

const Reducers = combineReducers({
    authReducer: AuthReducer,
    api: fetchCatagories,
    singleNFT: getSingleNFT,
    collection: collectionPage
}
)
export default Reducers