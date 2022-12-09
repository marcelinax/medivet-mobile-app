import { authClient, noAuthClient } from "api/services";
import { AxiosResponse } from 'axios';
import { AuthCredentials, AuthToken } from "types/api/auth/types";

class AuthApi {

    static async authUser(data: AuthCredentials): Promise<AuthToken> {
        const res = await noAuthClient.post('auth/login', {
            ...data
        });
        return res.data;
    };

    static async validateToken(): Promise<AxiosResponse> {
        return await authClient.get('auth/validate-token');
    }
}

export { AuthApi };
