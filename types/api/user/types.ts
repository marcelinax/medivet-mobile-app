import { AddressApi } from 'types/api/types';
import { Clinic } from 'types/api/clinic/types';

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

export type UserRoleType = 'patient' | 'vet';

export interface VetSpecialization {
  name: string;
  id: number;
}

export interface VetOpinion {
  id: number;
  message: string;
  rate: number;
  issuer: User;
  date: string;
  vet: User;
}
