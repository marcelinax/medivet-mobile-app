import {AddressApi} from "types/api/types";

export interface Clinic {
    id: number;
    name: string;
    address: AddressApi;
    phoneNumber: string;
}
