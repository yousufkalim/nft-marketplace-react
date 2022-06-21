import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import collectionReducer from "./collectionForm/collectionReducer";

const reducers = combineReducers({
    auth:authReducer,
    collectionData:collectionReducer
});

export default reducers;