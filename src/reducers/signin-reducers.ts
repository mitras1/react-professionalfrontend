import { SigninActionTypes } from "../action-types";
import SigninAction from "../actions/signin-action";
import { UserProfile } from "../models";

const EMPTY_USER_PROFILE: UserProfile = {
    userProfileId: "",
    email: "",
    title: "",
    department: ""
};

const DEFAULT_ERROR_OCCURRED = {
    errorStatus: true,
    errorText: ""
};

const signinReducers = {
    userProfileReducer: (state: UserProfile = EMPTY_USER_PROFILE, action: SigninAction) => {
        let nextState = state;

        if (action.type !== undefined &&
            action.type === SigninActionTypes.AuthenticationSuccessful) {
            if (action.userProfile) {
                nextState = action.userProfile;
            }
        }

        return nextState;
    },
    authenticationStatusReducer: (state: boolean = false, action: SigninAction) => {
        let nextState = state;

        if (action.type !== undefined &&
            action.type === SigninActionTypes.AuthenticationSuccessful) {
            if (action.authenticationStatus !== undefined) {
                nextState = action.authenticationStatus;
            }
        }

        return nextState;
    },
    authenticationErrorOccurredReducer: (state: {
        errorStatus?: boolean, errorText?: string
    } = DEFAULT_ERROR_OCCURRED, action: SigninAction) => {
        let nextState = state;

        if (action.type !== undefined &&
            action.type === SigninActionTypes.AuthenticationFailed) {
            if (action.authenticationError !== undefined) {
                nextState = action.authenticationError;
            }
        }

        return nextState;
    }
};

export default signinReducers;
