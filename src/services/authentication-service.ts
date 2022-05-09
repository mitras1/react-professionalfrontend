import 'whatwg-fetch';
import SigninActionCreators from '../action-creators/signin-action-creators';
import AuthenticationTokenService from './authentication-token-service';
import TokenParserService from './token-parser-service';

const INVALID_DISPATCHER_SPECIFIED = "Invalid Dispatcher Specified!";
const DEFAULT_AUTH_URL = "https://localhost:44300/authenticate";
const AUTHENTICATION_FAILED = "Authentication Failed and Unable to Prepare Tokens!";

const AuthenticationService = {
    authenticate: (userProfileId: string, password: string, callback?: () => void) => {
        return (dispatch: any) => {
            const validation = dispatch !== undefined || dispatch !== null;

            if (!validation) {
                throw new Error(INVALID_DISPATCHER_SPECIFIED);
            }

            const authenticationUrl = process.env.REACT_APP_AUTH_URL || DEFAULT_AUTH_URL;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userProfileId,
                    password
                })
            };

            fetch(authenticationUrl, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        dispatch(SigninActionCreators.createAuthenticationFailed(response.statusText));

                        return;
                    }

                    return response;
                })
                .then(response => response?.json())
                .then(response => {
                    const token = response.token;

                    if (token) {
                        const userProfile = TokenParserService.parse(token);

                        AuthenticationTokenService.setAuthToken(token);

                        dispatch(SigninActionCreators.createAuthenticationSuccessful(userProfile));
                    } else {
                        dispatch(SigninActionCreators.createAuthenticationFailed(AUTHENTICATION_FAILED));
                    }
                })
                .catch(error => dispatch(SigninActionCreators.createAuthenticationFailed(error)))
                .finally(() => {
                    if (callback !== undefined) {
                        callback();
                    }
                });
        };
    }
};

export default AuthenticationService;
