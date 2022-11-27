import { noAuthClient } from "api/services";
import { AuthCredentials, AuthToken } from "types/api/auth/types";

export const authUser = (data: AuthCredentials): Promise<AuthToken> => noAuthClient.post('auth/login', {
    ...data
});