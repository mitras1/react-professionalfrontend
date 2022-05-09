import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { combinedReducers } from "../reducers";

const preloadedState = {};
const appStore = createStore(
    combinedReducers,
    preloadedState,
    applyMiddleware(thunk));

export default appStore;
