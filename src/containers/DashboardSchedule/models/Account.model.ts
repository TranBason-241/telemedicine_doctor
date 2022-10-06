export type Account = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    locality: string;
    city: string;
    postalCode: string;
    phone: string;
    avatar?: string;
    dob: string;
    isMale: boolean;
    active: boolean;
    registerTime?: string;
    role?: Role;
};

export type Role = {
    id: number;
    name: string;
};
