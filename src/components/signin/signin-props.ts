import { UserProfile } from "../../models";

interface SigninProps {
    userProfile?: UserProfile,
    authenticationStatus?: boolean;
    authenticationError?: {
        errorStatus?: boolean;
        errorText?: string;
    },
    authenticate?: (userProfileId: string, password: string, callback?: () => void) => void;
};

export default SigninProps;
