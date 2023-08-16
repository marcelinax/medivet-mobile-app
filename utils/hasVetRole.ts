import { User } from 'types/api/user/types';

export const hasVetRole = (user: User) => user?.role === 'vet';
