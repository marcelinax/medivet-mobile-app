import {User} from "types/api/user/types";

export const hasVetRole = (user: User) => {
    return user?.role === 'vet';
}
