import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import Reducers from './index'


const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
    blacklist: ['api', "collection", "singleNFT"]
}
const persistedReducer = persistReducer(persistConfig, Reducers)
const store = createStore(
    persistedReducer, compose(applyMiddleware(thunk)))
let persistor = persistStore(store)
export { store, persistor }