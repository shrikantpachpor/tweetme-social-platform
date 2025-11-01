import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer.js";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import getDistanceProcessed from "./sagas/SpotSaga.js";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = typeof window === "undefined" ? {} : window.INITIAL_STATE;
//const initialState = {};
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  initialState,

  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);
export default store;
