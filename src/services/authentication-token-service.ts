const INVALID_TOKEN = "Invalid Authentication Token Specified!";
const AUTH_TOKEN = "ms-training-auth-token";

const AuthenticationTokenService = {
    setAuthToken: (token: string) => {
        if (!token) {
            throw new Error(INVALID_TOKEN);
        }

        window.localStorage.setItem(AUTH_TOKEN, token);
    },
    getAuthToken: (): string => {
        const token = window.localStorage.getItem(AUTH_TOKEN) || "";

        return token;
    },
    removeAuthToken: () => {
        window.localStorage.removeItem(AUTH_TOKEN);
    }
};

export default AuthenticationTokenService;
