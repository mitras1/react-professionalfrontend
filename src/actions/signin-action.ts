import { SigninActionTypes } from "../action-types";
import { UserProfile } from "../models";
import BaseAction from "./base-action";

interface SigninAction extends BaseAction {
    type?: SigninActionTypes,
    authenticationStatus?: boolean;
    authenticationError?: {
        errorStatus?: boolean;
        errorText?: string
    };
    userProfile?: UserProfile
}

export default SigninAction;
