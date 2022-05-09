import { SigninActionTypes } from "../action-types";
import SigninAction from "../actions/signin-action";
import { UserProfile } from "../models";

const DEFAULT_USER_PROFILE: UserProfile = {
    userProfileId: "",
    email: "",
    department: "",
    title: ""
};

const SigninActionCreators = {
    createAuthenticationSuccessful: (userProfile: UserProfile = DEFAULT_USER_PROFILE): SigninAction => {
        return {
            type: SigninActionTypes.AuthenticationSuccessful,
            userProfile: userProfile,
            authenticationStatus: true
        };
    },
    createAuthenticationFailed: (errorText: string = ""): SigninAction => {
        return {
            type: SigninActionTypes.AuthenticationFailed,
            authenticationStatus: false,
            authenticationError: {
                errorStatus: true,
                errorText: errorText
            }
        }
    }
};

export default SigninActionCreators;
