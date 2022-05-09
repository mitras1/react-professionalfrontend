import { UserProfile } from "../models";

const INVALID_TOKEN = "Invalid Token Specified!";
const TOKEN_DELIMITER = ".";

const TokenParserService = {
    parse: (token: string): UserProfile => {
        if (!token) {
            throw new Error(INVALID_TOKEN);
        }

        const splittedToken = token.split(TOKEN_DELIMITER);
        const payload = splittedToken[1];
        const decodedPayload = JSON.parse(atob(payload));

        const userProfile: UserProfile = new UserProfile(
            decodedPayload.userProfileId,
            decodedPayload.email,
            decodedPayload.department,
            decodedPayload.title);

        return userProfile;
    }
};

export default TokenParserService;
