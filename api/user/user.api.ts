import { noAuthClient } from "api/services";
import { RegistrationCredentials, User } from "types/api/user/types";

class UserApi {
    static async registerUser(data: RegistrationCredentials): Promise<User> {
        const res = await noAuthClient.post('users', {
            ...data
        });
        return res.data;
    }
}

export { UserApi };
