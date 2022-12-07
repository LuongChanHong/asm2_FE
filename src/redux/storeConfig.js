import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import hotel from "./reducers/hotelReducer";
import user from "./reducers/userReducer";
//create root reducer
const reducer = combineReducers({
  hotel,
  user,
});

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};
const _persistReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  _persistReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
