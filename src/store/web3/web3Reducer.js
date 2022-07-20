import {
    WALLET_CONNECTION_SUCCESS,
    WALLET_CONNECTION_FAILURE,
} from "./web3ActionTypes";

const initialState = {
    wallet: null,
    connected: false,
};

const web3Reducer = (state = initialState, action) => {
    switch (action.type) {
        case WALLET_CONNECTION_SUCCESS:
            return { ...state, wallet: action.payload, connected: true };
        case WALLET_CONNECTION_FAILURE:
            return { ...state, wallet: action.payload, connected: false };
        default:
            return state;
    }
};

export default web3Reducer;
