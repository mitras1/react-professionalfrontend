import { combineReducers } from "redux";
import customerReducers from "./customer-reducers";
import signinReducers from "./signin-reducers";

const combinedReducers = combineReducers({
    fillCustomers: customerReducers.fillCustomersReducer,
    isLoading: customerReducers.isLoadingReducer,
    errorOccurred: customerReducers.errorOccurredReducer,
    userProfile: signinReducers.userProfileReducer,
    authenticationStatus: signinReducers.authenticationStatusReducer,
    authenticationErrorOccurred: signinReducers.authenticationErrorOccurredReducer
});

export default combinedReducers;
