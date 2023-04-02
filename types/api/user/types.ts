import { AddressApi } from "../types";

export interface RegistrationCredentials {
    email: string;
    password: string;
    name: string;
    gender: string;
    birthDate: string;
    role: string;
    acceptTerms: boolean;
}

export interface User {
    name: string;
    email: string;
    birthDate: string;
    role: string;
    gender: string;
    profilePhotoUrl?: string;
    phoneNumber?: string;
    address?: AddressApi;
}