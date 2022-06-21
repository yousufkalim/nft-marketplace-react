import { COLLECTION_DATA_SUCCESS } from "./collectionActionTypes";

const initialState = {
  collectionData: {},
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default collectionReducer;
