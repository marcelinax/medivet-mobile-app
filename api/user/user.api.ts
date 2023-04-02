import { authClient, noAuthClient } from "api/services";
import { RegistrationCredentials, User } from "types/api/user/types";

class UserApi {
    static async registerUser(data: RegistrationCredentials): Promise<User> {
        const res = await noAuthClient.post('users', {
            ...data
        });
        return res.data;
    }

    static async getUser(): Promise<User> {
        const res = await authClient.get('users/me');
        return res.data;
    }

    static async uploadNewUserProfilePhoto(data: FormData): Promise<User> {
        const res = await authClient.post('users/me/upload-profile-photo', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return res.data;
    }

    static async updateUser(data: User): Promise<User> {
        const res = await authClient.put('users/me', data);
        return res.data;
    }
}

export { UserApi };
