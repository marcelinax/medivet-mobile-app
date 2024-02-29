import { AddressApi } from 'types/api/types';
import { Clinic } from 'types/api/clinic/types';
import { VetOpinion } from 'types/api/opinion/types';

export interface RegistrationCredentials {
  email: string;
  password: string;
  name: string;
  gender: string;
  birthDate?: Date;
  role: UserRoleType;
  acceptTerms: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  role: UserRoleType;
  gender: string;
  profilePhotoUrl?: string;
  phoneNumber?: string;
  address?: AddressApi;
  specializations?: VetSpecialization[];
  opinions?: VetOpinion[];
  clinics?: Clinic[];
}

export type UserRoleType = 'PATIENT' | 'VET';

export interface VetSpecialization {
  name: string;
  id: number;
}

export interface FavouriteVet {
  id: number;
  user: User;
  vet: User;
  isFavourite: boolean;
}
