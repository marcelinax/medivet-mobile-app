import { User } from 'types/api/user/types';

export interface VetOpinion {
  id: number;
  message: string;
  rate: number;
  issuer: User;
  date: string;
  vet: User;
}

export interface CreateVetOpinion {
  vetId: number;
  message: string;
  rate: number;
}
