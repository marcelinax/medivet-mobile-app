import { noAuthClient } from "api/services";
import { AuthCredentials, AuthToken } from "types/api/auth/types";

export const authUser = async (data: AuthCredentials): Promise<AuthToken> => {
    const res = await noAuthClient.post('auth/login', {
        ...data
    });

    return res.data;
};