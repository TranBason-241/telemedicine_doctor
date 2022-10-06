import { Role } from "./Role.model";

export type Account = {
    id?: number;
    email: string;
    firstName: string;
    lastName: string;
    ward: string;
    streetAddress: string;
    locality: string;
    city: string;
    postalCode: string;
    phone: string;
    avatar: string;
    dob: string;
    isMale: boolean;
    active: boolean;
    registerTime?: string;
    role?: Role;
};

export type AccountUpdate = {
    id?: number;
    firstName: string;
    lastName: string;
    ward: string;
    streetAddress: string;
    locality: string;
    city: string;
    postalCode: string;
    phone: string;
    avatar: string;
    dob: string;
    isMale: boolean;
};
