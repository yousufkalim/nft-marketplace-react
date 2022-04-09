import { combineReducers } from "redux";
import { AuthReducer, fetchCatagories, getSingleNFT } from './AuthReducers'

const Reducers = combineReducers({
    authReducer: AuthReducer,
    api: fetchCatagories,
    singleNFT: getSingleNFT,
}
)
export default Reducers