import {AddressApi} from "../types";

export interface RegistrationCredentials {
    email: string;
    password: string;
    name: string;
    gender: string;
    birthDate: string;
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
}

export type UserRoleType = 'patient' | 'vet';

export interface VetSpecialization {
    namePl: string;
    id: number;
}
