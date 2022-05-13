import {
    COLLECTION_DATA_SUCCESS,
  } from "./collectionActionTypes";
  
  export const collectionDataSuccess = (data) => {
    return {
      type: COLLECTION_DATA_SUCCESS,
      payload: data,
    };
  };
  